import { get, ref, push, set } from 'firebase/database'
import { db } from '../config/firebase-config'

export const getUserSessions = ({ owner }) => {
  return get(ref(db, `sessions/${owner}`))
    .then(snapshot => snapshot.exists() ? Object.values(snapshot.val()) : [])
}

export const createSession = ({ owner, date, style, minutes, note = '' }) => {
  const sessionRef = push(ref(db, `sessions/${owner}`))
  const session = {
    id: sessionRef.key,
    date,
    style,
    minutes: Number(minutes),
    note,
    createdOn: Date.now(),
  }

  return set(sessionRef, session).then(() => session)
}
