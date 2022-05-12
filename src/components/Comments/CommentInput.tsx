/* eslint-disable no-param-reassign */
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";
import { useState } from "react";
import { db } from "utils/firebaseConfig";

function CommentInput(props: any): JSX.Element {
  const [comment, setComment] = useState("");
  const parentCommentId = props.parentCommentId ? props.parentCommentId : null;
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const userAvatar = useSelector((state: RootStateOrAny) => state.auth.avatar);
  const firstName = useSelector(
    (state: RootStateOrAny) => state.auth.firstName
  );
  const lastName = useSelector((state: RootStateOrAny) => state.auth.lastName);

  async function postComment() {
    const commentData = {
      comment,
      likes: [],
      parentCommentId,
      postId: props.postId,
      timestamp: serverTimestamp(),
      userAvatar,
      userId,
      firstName,
      lastName,
    };
    await addDoc(collection(db, "comments"), commentData);
    setComment("");
    if (props.setAllComments) {
      props.setAllComments((prev: Array<any>) => [commentData, ...prev]);
    }
  }

  return (
    <Paper
      component="form"
      sx={{
        p: "5px 0",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "5%",
      }}
    >
      <InputBase
        multiline
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add comment"
        inputProps={{ "aria-label": "Add comment" }}
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <IconButton onClick={postComment} sx={{ p: "10px", fontSize: "15px" }}>
        Post comment
      </IconButton>
    </Paper>
  );
}

export default CommentInput;
