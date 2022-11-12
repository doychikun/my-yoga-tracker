import { TextField, InputAdornment} from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { getAllGoals } from '../../../services/goals/goals'
import { Search } from '@mui/icons-material';
import AppContext from "../../../providers/AppContext"

const SearchGoals = ({setFoundGoals}) => {
    const { userData } = useContext(AppContext)
    const [query, setQuery] = useState('')
    const [value, setValue] = useState('')
    
    useEffect(() => {
        if (value.length >= 3) {
            setQuery(value)
        } else {
            setQuery('')
            setFoundGoals(null)
        }
    }, [value, setFoundGoals])

    useEffect(() => {
        if (query) {
            getAllGoals().then(snapshot => {
                const goals = snapshot.val() ?
                    Object.keys(snapshot.val())
                    .reduce((goalsArray, currentKey) => {
                        return [...goalsArray, ...(typeof snapshot.val()?.[currentKey] === 'object' ? Object.values(snapshot.val()?.[currentKey]) : snapshot.val()?.[currentKey]?.filter(n => n))]
                    }, [])
                : null

                const filteredGoals = goals?.filter(goal => goal.name.toLowerCase().includes(query.toLowerCase()))
                    .filter(goal => goal.owner !== userData.username)

                setFoundGoals(filteredGoals.length > 0 ? filteredGoals : null)
             })
        }
    }, [query, setFoundGoals, userData])

    return (
        <TextField
            variant='outlined'
            type='text'
            placeholder='compare goals'
            fullWidth
            value={value}
            onChange={(event) => setValue(event.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <Search />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default SearchGoals
