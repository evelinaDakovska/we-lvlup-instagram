import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { login, AuthState, logout } from "../../store/auth";
import { dispatch } from "../../store/index";

export function signUp(userData: AuthState) {
  const { email, password, firstName, lastName, avatar } = userData;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: any) => {
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        email,
        firstName,
        lastName,
        avatar,
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

export function signInGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line no-unused-vars
      const token = credential?.accessToken;
      const { user } = result;
      const userID = user.uid;
      const { email } = user;
      const fullName = user.displayName?.split(" ");
      let firstName;
      let lastName;
      if (fullName) {
        // eslint-disable-next-line prefer-destructuring
        firstName = fullName[0];
        // eslint-disable-next-line prefer-destructuring
        lastName = fullName[1];
      }
      const avatar = user.providerData[0].photoURL;

      const userRef = doc(db, "users", userID);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email,
          firstName,
          lastName,
          avatar,
        });
      }

      dispatch(login({ email, password: "", firstName, lastName, avatar }));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function signInFacebook() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const { user } = result;
      console.log(user);

      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      console.log(accessToken);
      // ...
    })
    .catch((error) => {
      console.log(error.message);
    });
}
