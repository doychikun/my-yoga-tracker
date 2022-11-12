import './YogiGoals.css'
import GoalChart from './GoalChart/GoalChart'
import { Grid, Box, Button, Typography, TextField } from '@mui/material'
import { getAllCustomerGoals } from '../../services/goals/goals'
import { useState, useEffect, useContext } from 'react'
import FilterResults from './FilterResults/FilterResults'
import CustomDialog from '../../components/CustomDialog/CustomDialog'
import GoalAddEdit from './GoalChart/GoalAddEdit/GoalAddEdit'
import { Add } from '@mui/icons-material'
import AppContext from "../../providers/AppContext"
import SearchGoals from './SearchGoals/SearchGoals'
import ProgressChart from './ProgressChart/ProgressChart'
import LinearProgressWithLabel from "./ProgressChart/LinearProgressWithLabel/LinearProgressWithLabel";

const YOGA_TYPES = [
    {
        name: "vinyasa Flow",
        progress: 0,
        amount: 100
    },
    {
        name: "hatha yoga",
        progress: 0,
        amount: 100
    },
    {
        name: "ashtanga yoga",
        progress: 0,
        amount: 100
    },
    {
        name: "yin yoga",
        progress: 0,
        amount: 100
    },
    {
        name: "mindfulness yoga",
        progress: 0,
        amount: 100
    }
];

const YogiGoals = () => {
  const { userData } = useContext(AppContext)
  const [unfilteredGoals, setUnfilteredGoals] = useState(null)
  const [filteredGoals, setFilteredGoals] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [foundGoals, setFoundGoals] = useState(null)

  const closeAdd = () => setOpenDialog(false)
  const openAdd = () => setOpenDialog(true)

  useEffect(() => {
    getAllCustomerGoals({ owner: userData.username })
      .then(snapshot => {
        const goals = snapshot.val() ? Object.keys(snapshot.val())
            .reduce((goalsArray, currentKey) => [...goalsArray, snapshot.val()[currentKey]], []) : null
        setUnfilteredGoals(goals)
        setFilteredGoals(goals)
      }
      )
  }, [userData])


  const localYogaTypes = localStorage.getItem('yogaTypes');
  const [yogaTypes, setYogaTypes] = useState(localYogaTypes ? JSON.parse(localYogaTypes) : YOGA_TYPES);
  const [selectedPractice, setSelectedPractice] = useState(null);
  
  const selectCurrentPractice = ({ practiceItem }) => {
    if (selectedPractice && practiceItem.name === selectedPractice.name) {
      return setSelectedPractice(null);
    }

    setSelectedPractice(practiceItem);
  };

  const updateYogaType = () => {
    const newYogaTypes = yogaTypes.map(yogaType => {
      if (selectedPractice.name !== yogaType.name) {
        return yogaType;
      }
      
      return selectedPractice;
    })
    localStorage.setItem('yogaTypes', JSON.stringify(newYogaTypes));
    setYogaTypes(newYogaTypes);
  };

  const updateCurrentPractice = (event) => {
    setSelectedPractice(prevSelectedPractice => ({ ...prevSelectedPractice, progress: Number(event.target.value) }));
  };

  return (
    <Box className='YogiGoals'>
           <Typography variant='h4' textAlign={'start'}>My daily hour of yoga practice</Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container>
            <Grid>
              <ProgressChart yogaTypes={yogaTypes} />
            </Grid>
          <Grid container item spacing={1} xs={12}>
              {yogaTypes.map((practiceItem, index) => {
                return (
                  <Grid item key={practiceItem.name + index}>
                      <Button
                          variant='contained'
                          onClick={() => selectCurrentPractice({practiceItem})}
                          fullWidth
                          sx={{
                          backgroundColor: '#F8C55C',
                          padding: '10px',
                          color: '#272727',
                          marginRight: '25px',
                          borderRadius: '28px',
                          fontSize: '10px',
                          '&:hover': {
                              backgroundColor: '#F8C55C',
                              color: '#9494B6',
                          },
                      }}>
                          {practiceItem.name}
                      </Button>
                  </Grid>
                )
              })}
              {selectedPractice &&(
                <Grid container item spacing={2} justifyContent={'center'}>
                  <Grid item xs={12} width={'50%'}>
                    <LinearProgressWithLabel value={selectedPractice.progress} />
                  </Grid>
                  <Grid item >
                    <TextField
                      variant='outlined'
                      type='number'
                      inputProps={{
                        step: "any",
                        min: 0,
                        max: 100
                      }}
                      placeholder='Progress'
                      fullWidth
                      value={selectedPractice.progress}
                      onChange={updateCurrentPractice}
                    />
                  </Grid>
                  <Grid item alignSelf={'center'}>
                    <Button
                        variant='contained'
                        onClick={updateYogaType}
                        fullWidth
                        sx={{
                        backgroundColor: '#F8C55C',
                        padding: '10px',
                        color: '#272727',
                        marginRight: '25px',
                        borderRadius: '28px',
                        fontSize: '12px',
                        '&:hover': {
                            backgroundColor: '#F8C55C',
                            color: '#9494B6',
                        },
                    }}>
                        Apply progress
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <FilterResults unfilteredGoals={unfilteredGoals} setFilteredGoals={setFilteredGoals} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6} >
            <Grid item alignSelf={'center'}>
                <Button
                  variant='contained'
                  color='success'
                  startIcon={<Add />}
                  title='Add'
                  onClick={openAdd}
                  fullWidth
                >
                  Add new goal
                </Button>
            </Grid>
            <Grid item>
                <SearchGoals setFoundGoals={setFoundGoals} />
            </Grid>
          </Grid>
        </Grid>
        {foundGoals && 
          <Grid item xs={12}>
            <Typography variant='h4' textAlign={'start'}>Found goals</Typography>
          </Grid>
        }
        {foundGoals?.length && foundGoals.map((goal) => (
          <Grid item key={goal.id}>
            <GoalChart data={goal} setFilteredGoals={setFilteredGoals} isGoalFromCurrentUser={goal.owner === userData.username} unfilteredGoals={unfilteredGoals} setUnfilteredGoals={setUnfilteredGoals} />
          </Grid>
        ))}

        {filteredGoals && 
          <Grid item xs={12}>
            <Typography variant='h4' textAlign={'start'}>My Goals</Typography>
          </Grid>
        }
        {filteredGoals?.length && filteredGoals.map((goal) => (
          <Grid item key={goal.id}>
            <GoalChart data={goal} setUnfilteredGoals={setUnfilteredGoals} isGoalFromCurrentUser={goal.owner === userData.username}/>
          </Grid>
        ))}
      </Grid>
      <CustomDialog
        Component={() => <GoalAddEdit close={closeAdd} setUnfilteredGoals={setUnfilteredGoals} />}
        title={'Add'}
        open={openDialog}
        close={closeAdd}
      />
    </Box>
  )
}

export default YogiGoals
