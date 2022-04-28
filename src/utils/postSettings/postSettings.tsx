import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebaseConfig";

export async function addSinglePost(
  photo: File,
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

  await uploadBytes(postRef, photo);
  await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    fileURL = downloadURL;
  });

  await addDoc(collection(db, "posts"), {
    url: fileURL,
    description,
    userId,
    userNames: `${firstName} ${lastName}`,
    userAvatar,
    likesCount: 0,
    likes: [],
    commentsCount: 0,
    comments: [],
    timestamp: serverTimestamp(),
  });

  const userRef = doc(db, "users", userId);
  const getUser = await getDoc(userRef);
  const userPosts = getUser.data()!.postsCount + 1;
  await updateDoc(userRef, {
    postsCount: userPosts,
  });
}
