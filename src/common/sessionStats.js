import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval, subDays } from 'date-fns'
import { YOGA_STYLES } from './yoga.types'

const DATE_FORMAT = 'yyyy-MM-dd'

export const toDateKey = (date) => format(date, DATE_FORMAT)

/**
 * Minutes practised per style in the week (Mon-Sun) containing `today`.
 * Returns one entry per style in YOGA_STYLES order, including styles with 0 minutes.
 */
export const weeklyMinutesByStyle = (sessions, today = new Date()) => {
  const week = {
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 }),
  }
  const totals = sessions
    .filter(session => isWithinInterval(parseISO(session.date), week))
    .reduce((acc, session) => ({
      ...acc,
      [session.style]: (acc[session.style] || 0) + Number(session.minutes || 0),
    }), {})

  return YOGA_STYLES.map(({ key, label }) => ({ style: key, label, minutes: totals[key] || 0 }))
}

/**
 * Number of consecutive days with at least one session, counting back from today.
 * If nothing is logged today yet, the streak still counts from yesterday,
 * so it only breaks once a full day is missed.
 */
export const currentStreak = (sessions, today = new Date()) => {
  const practisedDays = new Set(sessions.map(session => session.date))
  let day = practisedDays.has(toDateKey(today)) ? today : subDays(today, 1)
  let streak = 0

  while (practisedDays.has(toDateKey(day))) {
    streak += 1
    day = subDays(day, 1)
  }

  return streak
}
