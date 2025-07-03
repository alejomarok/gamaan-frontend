import { auth } from "../firebaseconfig"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

export const registerUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  return result.user
}

export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const logoutUser = async () => {
  await signOut(auth)
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
