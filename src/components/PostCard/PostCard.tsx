/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Tooltip from "@mui/material/Tooltip";
import { RootStateOrAny, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeHandler } from "utils/postSettings/likeHandler";
import styles from "./PostCard.module.scss";

function PostCard(props: any): JSX.Element {
  const navigate = useNavigate();
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const [dislikedPost, setDislikedPost] = useState<boolean>(false);
  const current = props.postData;
  const { postId } = props;
  const currentUserId = useSelector(
    (state: RootStateOrAny) => state.auth.userId
  );

  function likeBtnHandler() {
    setLikedPost((prevValue: boolean) => !prevValue);
    likeHandler(postId!, currentUserId);
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
        onClick={() => navigate(`/details/${postId}`)}
      />
      <div className={styles.options}>
        <Tooltip title="Like post">
          <FavoriteBorderIcon
            sx={likedPost ? { color: "red" } : null}
            onClick={likeBtnHandler}
          />
        </Tooltip>
        <Tooltip title="Dislike post">
          <HeartBrokenIcon />
        </Tooltip>
        <ChatBubbleOutlineIcon />
      </div>
      <div className={styles.description}>
        <span>{current.userNames}</span>
        {current.description}
      </div>
    </div>
  );
}

export default PostCard;
