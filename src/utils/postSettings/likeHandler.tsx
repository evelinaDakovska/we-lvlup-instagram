/* eslint-disable no-lonely-if */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import { db } from "utils/firebaseConfig";

export async function likeHandlerPosts(
  postId: string,
  currentUserId: string,
  action: string
) {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  let likesPost = postSnap.data()?.likes;
  let dislikesPost = postSnap.data()?.dislikes;

  if (action === "like") {
    if (!likesPost.includes(currentUserId)) {
      likesPost.push(currentUserId);
      if (dislikesPost.includes(currentUserId)) {
        const index = dislikesPost.indexOf(currentUserId);
        dislikesPost.splice(index, 1);
      }
    } else {
      const index = likesPost.indexOf(currentUserId);
      likesPost.splice(index, 1);
    }
  } else {
    if (!dislikesPost.includes(currentUserId)) {
      dislikesPost.push(currentUserId);
      if (likesPost.includes(currentUserId)) {
        const index = likesPost.indexOf(currentUserId);
        likesPost.splice(index, 1);
      }
    } else {
      const index = dislikesPost.indexOf(currentUserId);
      dislikesPost.splice(index, 1);
    }
  }

  await updateDoc(postRef, {
    likes: likesPost,
    dislikes: dislikesPost,
  });
}

export async function likeHandlerComments(
  commentId: string,
  currentUserId: string
) {
  const commentRef = doc(db, "comments", commentId);
  const commentSnap = await getDoc(commentRef);
  let likesComment = commentSnap.data()?.likes;

  if (!likesComment.includes(currentUserId)) {
    likesComment.push(currentUserId);
  } else {
    const index = likesComment.indexOf(currentUserId);
    likesComment.splice(index, 1);
  }

  await updateDoc(commentRef, {
    likes: likesComment,
  });
}
