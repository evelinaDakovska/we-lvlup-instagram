/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootStateOrAny, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { likeHandler } from "utils/postSettings/likeHandler";
import { db } from "../../utils/firebaseConfig";
import styles from "./PostCard.module.scss";

function PostCard(props: any): JSX.Element {
  const navigate = useNavigate();
  const [isHomePage, setIsHomePage] = useState<boolean>(true);
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const [dislikedPost, setDislikedPost] = useState<boolean>(false);
  const current = props.postData;
  // eslint-disable-next-line prefer-destructuring
  const postId = props.postId;
  const currentUserId = useSelector(
    (state: RootStateOrAny) => state.auth.userId
  );
  const postOwner = current.userId;

  useEffect(() => {
    if (window.location.href !== "http://localhost:3000/") {
      setIsHomePage(false);
    }
  }, []);

  function likeBtnHandler(action: string) {
    if (action === "like") {
      setLikedPost((prevValue: boolean) => !prevValue);
      setDislikedPost(false);
    } else {
      setDislikedPost((prevValue: boolean) => !prevValue);
      setLikedPost(false);
    }
    likeHandler(postId!, currentUserId, action);
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (db && postId && postOwner) {
        await deleteDoc(doc(db, "posts", postId));
        const userRef = doc(db, "users", postOwner);
        const getUser = await getDoc(userRef);
        const userPosts = getUser.data()!.postsCount - 1;
        await updateDoc(userRef, {
          postsCount: userPosts,
        });
        navigate(`/`);
      }
    }
  }

  return (
    <div className={styles.singlePost}>
      <div className={styles.userData}>
        <Avatar
          src={current.userAvatar}
          alt="User avatar"
          onClick={() => navigate(`/profile/${current.userId}`)}
          sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <h4 onClick={() => navigate(`/profile/${current.userId}`)}>
          {current.userNames}
        </h4>
      </div>
      <img
        src={current.url}
        alt="post"
        className={styles.image}
        onClick={() => {
          // eslint-disable-next-line no-unused-expressions
          isHomePage ? navigate(`/details/${postId}`) : null;
        }}
      />
      <div className={styles.options}>
        <div>
          <Tooltip title="Like post">
            <FavoriteBorderIcon
              sx={likedPost ? { color: "red" } : null}
              onClick={() => likeBtnHandler("like")}
            />
          </Tooltip>
          <Tooltip title="Dislike post">
            <HeartBrokenIcon
              sx={dislikedPost ? { color: "red" } : null}
              onClick={() => likeBtnHandler("dislike")}
            />
          </Tooltip>
          <ChatBubbleOutlineIcon />
        </div>
        {postOwner === currentUserId ? (
          <Tooltip title="Delete post">
            <DeleteIcon onClick={deletePost} />
          </Tooltip>
        ) : null}
      </div>
      <div className={styles.description}>
        <span>{current.userNames}</span>
        {current.description}
      </div>
    </div>
  );
}

export default PostCard;
