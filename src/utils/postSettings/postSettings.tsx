import { addDoc, collection } from "firebase/firestore";
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
  url: string
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
  });
}
