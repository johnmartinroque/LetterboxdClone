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
} from "../constants/authenticationConstants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

export const signInUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });

    // Search for the user by their username in Firestore
    const userDocRef = doc(db, "users", username); // Assuming username is the document ID in Firestore
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnap.data();
    const email = userData.email; // Retrieve the email associated with this username

    // Now authenticate using Firebase's signInWithEmailAndPassword
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
