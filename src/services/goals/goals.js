import { get, ref, query, set, remove } from 'firebase/database'
import { db } from '../../config/firebase-config'

export const getAllGoals = () => {
  return get(query(ref(db, 'goals')))
}

export const getAllCustomerGoals = ({ owner }) => {
  return get(query(ref(db, `goals/${owner}`)))
}

export const createGoal = ({ id, name, owner, goal, progress, unit, from, to }) => {
  return set(ref(db, `goals/${owner}/${id}`), {
    id,
    name,
    owner,
    goal,
    progress,
    unit,
    from,
    to,
  })
}

export const updateGoal = ({ id, owner, updates }) => {
  return set(ref(db, `goals/${owner}/${id}`), updates)
}

export const removeGoal = ({ id, owner }) => {
  return remove(ref(db, `goals/${owner}/${id}`))
}