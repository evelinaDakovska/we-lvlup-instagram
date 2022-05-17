import { query, where, orderBy, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import { db } from "utils/firebaseConfig";
import CommentInput from "./CommentInput";
import styles from "./Comments.module.scss";
import SingleComment from "./SingleComment";

function Comments(props: any): JSX.Element {
  const [allComments, setAllComments] = useState<any>([]);

  useEffect(() => {
    const getComments = async (): Promise<void> => {
      const allCommentsArray: Array<any> = [];
      const commentsRef = collection(db, "comments");
      const q = query(
        commentsRef,
        where("postId", "==", props.postId),
        where("parentCommentId", "==", null),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        allCommentsArray.push(data);
      });
      const promise = await Promise.all(allCommentsArray);
      setAllComments(promise);
    };
    getComments();
  }, [allComments]);

  return (
    <div className={styles.commentSection}>
      <CommentInput postId={props.postId} setAllComments={setAllComments} />
      {allComments.length > 0 ? (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            marginBottom: "18%",
            borderRadius: "3%",
          }}
        >
          {allComments.map((current: any) => {
            return (
              <SingleComment
                currentComment={current}
                currentId={current.id}
                key={current.id}
                postId={props.postId}
                allComments={allComments}
              />
            );
          })}
        </List>
      ) : null}
    </div>
  );
}

export default Comments;
