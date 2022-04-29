/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.scss";

function PostCard(props: any): JSX.Element {
  const navigate = useNavigate();
  const current = props.postData;

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
      <img src={current.url} alt="post" className={styles.image} />
      <div className={styles.options}>
        <FavoriteBorderIcon />
        <ChatBubbleOutlineIcon />
        <SendIcon />
        <BookmarkBorderIcon />
      </div>
      <div className={styles.description}>
        <span>{current.userNames}</span>
        {current.description}
      </div>
    </div>
  );
}

export default PostCard;
