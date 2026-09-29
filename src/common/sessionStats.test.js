import { weeklyMinutesByStyle, currentStreak } from './sessionStats'

// Wednesday
const today = new Date(2026, 8, 30)

describe('weeklyMinutesByStyle', () => {
  it('sums minutes per style within the current Mon-Sun week only', () => {
    const sessions = [
      { date: '2026-09-28', style: 'vinyasa', minutes: 30 },
      { date: '2026-09-30', style: 'vinyasa', minutes: '15' },
      { date: '2026-10-04', style: 'yin', minutes: 45 },
      { date: '2026-09-27', style: 'yin', minutes: 60 },
      { date: '2026-10-05', style: 'hatha', minutes: 20 },
    ]
    const result = weeklyMinutesByStyle(sessions, today)
    const byStyle = Object.fromEntries(result.map(r => [r.style, r.minutes]))

    expect(result).toHaveLength(5)
    expect(byStyle).toEqual({ vinyasa: 45, hatha: 0, ashtanga: 0, yin: 45, mindfulness: 0 })
  })
})

describe('currentStreak', () => {
  it('is 0 with no sessions', () => {
    expect(currentStreak([], today)).toBe(0)
  })

  it('counts consecutive days ending today', () => {
    const sessions = ['2026-09-30', '2026-09-29', '2026-09-29', '2026-09-28', '2026-09-26']
      .map(date => ({ date }))
    expect(currentStreak(sessions, today)).toBe(3)
  })

  it('keeps the streak alive when today is not logged yet', () => {
    const sessions = ['2026-09-29', '2026-09-28'].map(date => ({ date }))
    expect(currentStreak(sessions, today)).toBe(2)
  })

  it('is 0 once a full day is missed', () => {
    const sessions = ['2026-09-28'].map(date => ({ date }))
    expect(currentStreak(sessions, today)).toBe(0)
  })
})
