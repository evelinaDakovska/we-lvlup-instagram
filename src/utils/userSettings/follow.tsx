import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from "utils/firebaseConfig";

export async function follow(userId: string, ownerId: string) {
  const ownerRef = doc(db, "users", ownerId);
  const ownerSnap = await getDoc(ownerRef);
  const followers = ownerSnap.data()?.followers;

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const followed = userSnap.data()?.followed;

  if (!followers.includes(userId)) {
    followers.push(userId);
    followed.push(ownerId);
  } else {
    const indexFollowers = followers.indexOf(userId);
    followers.splice(indexFollowers, 1);
    const indexFollowed = followed.indexOf(ownerId);
    followed.splice(indexFollowed, 1);
  }

  await updateDoc(ownerRef, {
    followers,
  });
  await updateDoc(userRef, {
    followed,
  });
}
