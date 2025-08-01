import firebase from "firebase/app";
import "firebase/auth";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
} from "../constants/authenticationConstants";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

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
