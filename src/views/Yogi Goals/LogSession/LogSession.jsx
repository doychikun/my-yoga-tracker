import { useForm, Controller } from 'react-hook-form'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { YOGA_STYLES } from '../../../common/yoga.types'
import { toDateKey } from '../../../common/sessionStats'

const LogSession = ({ onLog }) => {
    const defaultValues = { date: toDateKey(new Date()), style: YOGA_STYLES[0].key, minutes: '', note: '' }
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues })

    // MUI TextField forwards `ref` to its wrapper, so hand RHF the real <input> via inputRef
    const registerField = (name, options) => {
        const { ref, ...field } = register(name, options)
        return { inputRef: ref, ...field }
    }

    const onSubmit = (data) => onLog(data).then(logged => logged && reset(defaultValues))

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} alignItems={'flex-start'}>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        label='Date'
                        type='date'
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: toDateKey(new Date()) }}
                        {...registerField('date', { required: true })}
                        error={!!errors.date}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Controller
                        name='style'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField select label='Style' fullWidth {...field}>
                                {YOGA_STYLES.map(({ key, label }) => (
                                    <MenuItem key={key} value={key}>{label}</MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                    <TextField
                        label='Minutes'
                        type='number'
                        fullWidth
                        inputProps={{ min: 1, max: 600 }}
                        {...registerField('minutes', { required: true, min: 1, max: 600 })}
                        error={!!errors.minutes}
                        helperText={errors.minutes && '1 to 600'}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
                    <TextField
                        label='Note'
                        fullWidth
                        {...registerField('note', { maxLength: 200 })}
                    />
                </Grid>
                <Grid item xs={12} md={2} alignSelf={'center'}>
                    <Button
                        type='submit'
                        variant='contained'
                        startIcon={<Add />}
                        disabled={isSubmitting}
                        fullWidth
                        sx={{
                            backgroundColor: '#F8C55C',
                            padding: '10px',
                            color: '#272727',
                            borderRadius: '28px',
                            fontSize: '12px',
                            '&:hover': {
                                backgroundColor: '#F8C55C',
                                color: '#9494B6',
                            },
                        }}
                    >
                        Log session
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default LogSession
