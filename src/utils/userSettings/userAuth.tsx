import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { login, AuthState, logout } from "../../store/auth";
import { dispatch } from "../../store/index";

export function signUp(userData: AuthState) {
  const { email, password, firstName, lastName } = userData;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: any) => {
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        email,
        firstName,
        lastName,
      });
      const updatedUserData = { ...userData, userId };

      dispatch(login(updatedUserData));
    })
    .catch((error: any) => {
      console.log(error.message);

      // ..
    });
}

export function signOutFunc() {
  signOut(auth)
    .then(() => {
      dispatch(logout());
    })
    .catch((error: any) => {
      console.log(error.message);
    });
}

export function signIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userId = userCredential.user.uid;
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const data = { ...docSnap.data(), userId };
      dispatch(login(data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}
