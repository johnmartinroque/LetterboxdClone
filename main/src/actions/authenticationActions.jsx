import firebase from "firebase/app";
import "firebase/auth";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_RESET,
  USER_LOGOUT,
} from "../constants/authenticationConstants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const registerUser = (email, username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
    });

    await setDoc(doc(db, "users", user.uid), {
      userId: user.uid,
      email: email,
      username: username,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: { user: user },
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export const resetRegistration = () => (dispatch) => {
  dispatch({ type: USER_REGISTER_RESET });
};

export const signInUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.message,
    });
  }
};

// Reset sign-in state
export const resetSignIn = () => (dispatch) => {
  dispatch({ type: USER_SIGNIN_RESET });
};

export const logoutUser = () => async (dispatch) => {
  await signOut(auth); // Sign out from Firebase
  dispatch({ type: USER_LOGOUT }); // Clear Redux state
};
