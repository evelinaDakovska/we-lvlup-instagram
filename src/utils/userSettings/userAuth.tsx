import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { login, AuthState, logout } from "../../store/auth";
import { dispatch } from "../../store/index";

export function signUp(userData: AuthState, uploadedAvatar: File | undefined) {
  const { email, password, firstName, lastName, avatar } = userData;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: any) => {
      const userId = userCredential.user.uid;

      let fileURL;
      if (uploadedAvatar) {
        const avatarRef = ref(storage, userId);
        const uploadTask = uploadBytesResumable(avatarRef, uploadedAvatar);

        await uploadBytes(avatarRef, uploadedAvatar);
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          fileURL = downloadURL;
        });
      } else {
        fileURL = avatar;
      }

      await setDoc(doc(db, "users", userId), {
        userId,
        email,
        firstName,
        lastName,
        avatar: fileURL,
        followers: [],
        followed: [],
        postsCount: 0,
      });
      const updatedUserData = { ...userData, avatar: fileURL, userId };
      dispatch(login(updatedUserData));
    })
    .catch((error: any) => {
      console.log(error.message);
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

async function onSignInWithProvider(
  result: any,
  credential: any,
  facebook: boolean
) {
  // eslint-disable-next-line no-unused-vars
  const token = credential?.accessToken;
  const { user } = result;
  const userId = user.uid;
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

  let avatar = user.providerData[0].photoURL;
  if (facebook) {
    avatar = `${avatar}?height=500&access_token=${token}`;
  }

  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      userId,
      email,
      firstName,
      lastName,
      avatar,
      followers: [],
      followed: [],
      postsCount: 0,
    });
  }

  dispatch(login({ email, password: "", firstName, lastName, avatar, userId }));
}

export function signInGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      onSignInWithProvider(result, credential, false);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function signInFacebook() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      onSignInWithProvider(result, credential, true);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
