import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AppContext from '../../providers/AppContext'
import YogiGoals from './YogiGoals'
import { toDateKey } from '../../common/sessionStats'

// In-memory stand-in for sessions/{username} in the Realtime Database
const mockStore = {}

jest.mock('../../services/sessions', () => ({
  getUserSessions: ({ owner }) => Promise.resolve(Object.values(mockStore[owner] || {})),
  createSession: ({ owner, ...session }) => {
    const created = { id: `id-${Date.now()}-${Math.random()}`, ...session, minutes: Number(session.minutes) }
    mockStore[owner] = { ...(mockStore[owner] || {}), [created.id]: created }
    return Promise.resolve(created)
  },
}))

jest.mock('../../services/goals/goals', () => ({
  getAllCustomerGoals: () => Promise.resolve({ val: () => null }),
  getAllGoals: () => Promise.resolve({ val: () => null }),
}))

const renderPage = () => render(
  <AppContext.Provider value={{ userData: { username: 'niki' } }}>
    <YogiGoals />
  </AppContext.Provider>
)

const statValue = (caption) => screen.getByText(caption).previousSibling.textContent

it('logging a session updates streak and weekly minutes, and survives a reload', async () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  mockStore.niki = { a: { id: 'a', date: toDateKey(yesterday), style: 'yin', minutes: 20, note: '' } }

  const { unmount } = renderPage()
  await waitFor(() => expect(statValue('day streak')).toBe('1'))

  fireEvent.change(screen.getByLabelText('Minutes'), { target: { value: '35' } })
  fireEvent.click(screen.getByRole('button', { name: /log session/i }))

  await waitFor(() => expect(statValue('day streak')).toBe('2'))
  expect(Object.values(mockStore.niki)).toHaveLength(2)

  // "Reload": mount fresh and read back from the store
  unmount()
  renderPage()
  await waitFor(() => expect(statValue('day streak')).toBe('2'))
  const weekly = Number(statValue('minutes this week'))
  // yesterday may fall in last week when today is Monday
  expect([35, 55]).toContain(weekly)
  // the vinyasa bar in the chart is labelled with its minutes
  expect(screen.getAllByText('35').length).toBeGreaterThan(0)
})
