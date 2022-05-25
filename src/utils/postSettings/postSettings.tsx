/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore/lite";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { db, storage } from "../firebaseConfig";

export async function addSinglePost(
  photo: File | Blob,
  description: string,
  url: string,
  userAvatar: string,
  userId: string,
  firstName: string,
  lastName: string
) {
  let fileURL;
  const postRef = ref(storage, url);
  const uploadTask = uploadBytesResumable(postRef, photo);
  let fileMeta;

  await uploadBytes(postRef, photo);
  await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    fileURL = downloadURL;
  });
  await getMetadata(uploadTask.snapshot.ref)
    .then((metadata) => {
      fileMeta = metadata.contentType;
    })
    .catch((error) => {
      console.log(error);
    });

  await addDoc(collection(db, "posts"), {
    url: fileURL,
    description,
    userId,
    userNames: `${firstName} ${lastName}`,
    userAvatar,
    dislikes: [],
    likes: [],
    commentsCount: 0,
    comments: [],
    timestamp: serverTimestamp(),
    fileMeta,
  });

  const userRef = doc(db, "users", userId);
  const getUser = await getDoc(userRef);
  const userPosts = getUser.data()!.postsCount + 1;
  await updateDoc(userRef, {
    postsCount: userPosts,
  });
}

export async function addSingleStory(
  photo: File | Blob,
  userAvatar: string,
  userId: string,
  firstName: string,
  uploadedStoryURL: string
) {
  let fileURL;
  const storyRef = ref(storage, uploadedStoryURL);
  const uploadTask = uploadBytesResumable(storyRef, photo);
  let fileMeta;

  await uploadBytes(storyRef, photo);
  await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    fileURL = downloadURL;
  });
  await getMetadata(uploadTask.snapshot.ref)
    .then((metadata) => {
      fileMeta = metadata.contentType;
    })
    .catch((error) => {
      console.log(error);
    });

  await addDoc(collection(db, "stories"), {
    url: fileURL,
    userId,
    userName: firstName,
    timestamp: Date.now(),
    fileMeta,
  });
}

export async function getUserNames(arrayIds: Array<string>) {
  const usersNames: Array<string> = [];

  for (const id of arrayIds) {
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    usersNames.push(
      `${userSnap.data()?.firstName} ${userSnap.data()?.lastName}`
    );
  }
  return usersNames;
}
