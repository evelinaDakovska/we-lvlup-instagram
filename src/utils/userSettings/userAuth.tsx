import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebaseConfig";
import { login, AuthState } from "../../store/auth";
import { dispatch } from "../../store/index";

function onSignIn(userData: Omit<AuthState, "password">) {
  console.log("signed in");
  dispatch(login(userData));
}

export function signUp(userData: AuthState) {
  const { email, password, fName, lName } = userData;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: any) => {
      const userID = userCredential.user.uid;
      await setDoc(doc(db, "users", userID), {
        email,
        firstName: fName,
        lastName: lName,
      });
      const updatedUserData = { ...userData, userID };

      onSignIn(updatedUserData);
    })
    .catch((error: any) => {
      console.log(error.message);

      // ..
    });
}

/* function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userID = userCredential.user.uid;
      onSignIn(userID);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
 */
/* export function signOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
} */
