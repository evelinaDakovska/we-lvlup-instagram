import Avatar from "@mui/material/Avatar";
import styles from "./PostCard.module.scss";

function PostCard(props: any): JSX.Element {
  const current = props.postData;

  return (
    <div className={styles.singlePost}>
      <div className={styles.userData}>
        <Avatar src={current.userAvatar} alt="User avatar" />
        <h4>{current.userNames}</h4>
      </div>
      <img src={current.url} alt="post" className={styles.image} />
      <div className={styles.description}>
        <span>{current.userNames}</span>
        {current.description}
      </div>
    </div>
  );
}

export default PostCard;
