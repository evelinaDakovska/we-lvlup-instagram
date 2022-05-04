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
  getMetadata,
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
