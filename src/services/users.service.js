import { get, ref, query, set, update, orderByChild, equalTo } from "firebase/database";
import { db } from "../config/firebase-config";

/**
 * Get all users
 */
export const getAllUsers = () => {
  return get(query(ref(db, "users")));
};

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUser = (firstName, lastName, username, uid, email, gender, password, phoneNumber) => {
  return set(ref(db, `users/${username}`), {
    firstName,
    lastName,
    username,
    uid,
    email,
    gender,
    password,
    phoneNumber,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
}

export const updateUserProfilePicture = (username, url) => {
  return update(ref(db), {
    [`users/${username}/avatarUrl`]: url,
  });
};

export const updateUserData = (uid, updates) => {
  return update(ref(db, `users/${uid}`), updates);
};
