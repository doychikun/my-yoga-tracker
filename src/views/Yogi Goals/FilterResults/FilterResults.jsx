import { Button } from '@mui/material'
import { Search, Clear } from '@mui/icons-material'
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css'
import { Calendar } from '@amir04lm26/react-modern-calendar-date-picker'
import { format } from 'date-fns'
import { useState, useEffect, useCallback  } from 'react'
import './FilterResults.css'

const FilterResults = ({ unfilteredGoals, setFilteredGoals }) => {
    const [selectedDayRange, setSelectedDayRange] = useState({
            from: null,
            to: null,
        }
    )

    const clearFilter = useCallback(() => {
        setSelectedDayRange({
            from: null,
            to: null,
        })
        setFilteredGoals(unfilteredGoals)
    }, [setFilteredGoals, unfilteredGoals])

    const findGoalsByDateRange = useCallback(async ({ from, to }) => {
        if (unfilteredGoals) {
            const filteredGoals = unfilteredGoals.filter(goal => new Date(goal.from) >= new Date(from) && new Date(goal.to) <= new Date(to))
            setFilteredGoals(filteredGoals.length > 0 ? filteredGoals : null)
        }
    }, [setFilteredGoals, unfilteredGoals])

    const onSubmit = useCallback( async () => {
        if (selectedDayRange.from && selectedDayRange.to) {
            const from = format(new Date(selectedDayRange.from.year, selectedDayRange.from.month - 1, selectedDayRange.from.day ), 'yyyy-MM-dd')
            const to = format(new Date(selectedDayRange.to.year, selectedDayRange.to.month - 1, selectedDayRange.to.day), 'yyyy-MM-dd')
            await findGoalsByDateRange({ from, to })
        }
    }, [selectedDayRange, findGoalsByDateRange])

    useEffect(() => {
        clearFilter()
    }, [clearFilter])
    
    return (
        <Calendar
            onChange={setSelectedDayRange}
            value={selectedDayRange}
            colorPrimary='rgb(248, 197, 92)'
            colorPrimaryLight='#fef6e7'
            shouldHighlightWeekends
            calendarClassName='responsive-calendar' 
            renderFooter={() => (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                        <Button
                            onClick={() => onSubmit()}
                            variant='contained'
                            color='warning'
                            startIcon={<Search />}
                            title='Filter'
                        >
                            Filter
                        </Button>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                    <Button
                        onClick={() => clearFilter()}
                        variant='contained'
                        color='error'
                        startIcon={<Clear />}
                        title='Clear'
                    >
                        Clear
                    </Button>
                    </div>
                </>
            )}
        />
    )
}

export default FilterResults