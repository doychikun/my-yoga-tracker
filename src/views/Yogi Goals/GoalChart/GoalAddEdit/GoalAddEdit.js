import { useForm } from 'react-hook-form'
import { Button, Grid, TextField } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import { useEffect, useContext } from 'react'
import AppContext from "../../../../providers/AppContext"
import { getAllCustomerGoals, createGoal, updateGoal } from '../../../../services/goals/goals'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';

const GoalAddEdit = ({ currentGoalData, close, setUnfilteredGoals, setChartData }) => {
    const { userData } = useContext(AppContext)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()   

    const getGoalsAndCloseDialog = () => 
        getAllCustomerGoals({ owner: userData.username })
            .then(snapshot =>
                snapshot.val() && setUnfilteredGoals(
                    snapshot.val()
                        ? Object.keys(snapshot.val())
                            .reduce((goalsArray, currentKey) =>
                                [...goalsArray, snapshot.val()[currentKey] ]
                            , [])
                    : null
                )
            ).then(() => close())

    const onSubmit = (data) => {
        if (data) {
            const { name, owner, goal, progress, unit, from, to } = data
            
            if (!currentGoalData) {
                createGoal({
                    id: uuidv4(),
                    name,
                    owner,
                    goal,
                    progress,
                    unit,
                    from,
                    to,
                }).then(getGoalsAndCloseDialog)
            } else {
                updateGoal({
                    id: currentGoalData.id,
                    owner,
                    updates: {
                        name,
                        owner,
                        goal,
                        progress,
                        unit,
                        from,
                        to,
                    }
                }).then(getGoalsAndCloseDialog).then(() => {
                    setChartData({
                        progress,
                        data: [{ y: goal - progress, background: true }, { y: progress }]
                    })
                })
            }
        }
    }   

    useEffect(() => {
        if (currentGoalData) {
            setValue('name', currentGoalData.name)
            setValue('owner', currentGoalData.owner)
            setValue('goal', currentGoalData.goal)
            setValue('progress', currentGoalData.progress)
            setValue('unit', currentGoalData.unit)
            setValue('from', format( new Date(currentGoalData.from), 'yyyy-MM-dd'))
            setValue('to', format( new Date(currentGoalData.to), 'yyyy-MM-dd'))
        } else if (userData && !currentGoalData) {
            setValue('owner', userData.username)
        }
    }, [currentGoalData, setValue, userData])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='text'
                        placeholder='Name'
                        fullWidth
                        error={errors.name?.type === 'required'}
                        helperText={errors.name?.message}
                        {...register('name', { required: 'Name is required!' })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='text'
                        placeholder='Owner'
                        fullWidth
                        error={errors.owner?.type === 'required'}
                        helperText={errors.owner?.message}
                        {...register('owner')}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='number'
                        inputProps={{
                            step: "any"
                        }}
                        placeholder='Goal'
                        fullWidth
                        error={errors.goal?.type === 'required'}
                        helperText={errors.goal?.message}
                        {...register('goal', {valueAsNumber: true, required: 'Goal is required!' })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='number'
                        inputProps={{
                            step: "any"
                        }}
                        placeholder='Progress'
                        fullWidth
                        error={errors.progress?.type === 'required'}
                        helperText={errors.progress?.message}
                        {...register('progress', { valueAsNumber: true, required: 'Progress is required!' })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='text'
                        placeholder='Unit'
                        fullWidth
                        error={errors.unit?.type === 'required'}
                        helperText={errors.unit?.message}
                        {...register('unit')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='date'
                        placeholder='From date'
                        fullWidth
                        error={errors.from?.type === 'required'}
                        helperText={errors.from?.message}
                        {...register('from', { required: 'From date is required!' })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        type='date'
                        placeholder='To date'
                        fullWidth
                        error={errors.to?.type === 'required'}
                        helperText={errors.to?.message}
                        {...register('to', { required: 'To date is required!' })}
                    />
                    {}
                </Grid>
                <Grid item xs={12}>
                    <Button type={'submit'} variant='contained' color='warning' startIcon={currentGoalData ? <Edit /> : <Add />} title={currentGoalData ? 'Edit' : 'Add'}>
                        {currentGoalData ? 'Edit' : 'Add'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default GoalAddEdit
