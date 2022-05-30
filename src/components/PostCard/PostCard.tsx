/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootStateOrAny, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore/lite";
import { likeHandlerPosts } from "utils/postSettings/likeHandler";
import { getUserAvatar } from "utils/userSettings/userAuth";
import { db } from "../../utils/firebaseConfig";
import styles from "./PostCard.module.scss";

function PostCard(props: any): JSX.Element {
  const navigate = useNavigate();
  const [isHomePage, setIsHomePage] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [avatar, setAvatar] = useState("");
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const [dislikedPost, setDislikedPost] = useState<boolean>(false);
  const [likeNamesPost, setLikeNamesPost] = useState<Array<string>>([]);
  const [likes, setLikes] = useState<Array<string>>([]);
  const current = props.postData;
  const fileType = current.fileMeta;
  const postOwner = current.userId;
  const { postId } = props;
  const currentUserId = useSelector(
    (state: RootStateOrAny) => state.auth.userId
  );
  const currentUserName = `${useSelector(
    (state: RootStateOrAny) => state.auth.firstName
  )} ${useSelector((state: RootStateOrAny) => state.auth.lastName)}`;

  useEffect(() => {
    if (window.location.pathname.includes("/details")) {
      setIsHomePage(false);
    }
    const getAvatar = async () => {
      const currentAvatar = await getUserAvatar(current.userId);
      setAvatar(currentAvatar);
    };
    getAvatar();
  }, []);

  useEffect(() => {
    const isLiked = async (): Promise<void> => {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      const likesPost = postSnap.data()?.likes;
      if (likesPost.includes(currentUserId)) {
        setLikedPost(true);
      }
      const dislikesPost = postSnap.data()?.dislikes;
      if (dislikesPost.includes(currentUserId)) {
        setDislikedPost(true);
      }
    };
    const getLikeNames = async (): Promise<void> => {
      const usersNamesLiked: Array<string> = [];
      setLikes(current.likes);
      await current.likes.forEach(async (id: string, i: number) => {
        const usersRef = doc(db, "users", id);
        const userSnap = await getDoc(usersRef);
        usersNamesLiked.push(
          `${userSnap.data()?.firstName} ${userSnap.data()?.lastName}`
        );
        if (i === current.likes.length - 1) {
          setLikeNamesPost(usersNamesLiked);
        }
      });
    };
    isLiked();
    getLikeNames();
    setLoaded(true);
  }, []);

  function likeBtnHandler(action: string) {
    if (action === "like") {
      const likeNamesArray = [...likeNamesPost];
      if (likes.includes(currentUserId)) {
        const indexIds = likes.indexOf(currentUserId);
        likes.splice(indexIds, 1);
        const index = likeNamesPost.indexOf(currentUserName);
        likeNamesArray.splice(index, 1);
      } else {
        likeNamesArray.push(currentUserName);
        setLikes((prev) => [...prev, currentUserId]);
      }
      setLikeNamesPost(likeNamesArray);
      setLikedPost((prevValue: boolean) => !prevValue);
      setDislikedPost(false);
    } else {
      setDislikedPost((prevValue: boolean) => !prevValue);
      setLikedPost(false);
    }
    likeHandlerPosts(postId!, currentUserId, action);
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
        navigate("/");
        navigate(0);
      }
    }
  }

  function showLikes() {
    return (
      <>
        {likeNamesPost.map((currentName: string) => {
          return <div key={currentName}>{currentName}</div>;
        })}
      </>
    );
  }

  return (
    <div className={styles.singlePost}>
      <div className={styles.userData}>
        <Avatar
          src={avatar}
          alt="User avatar"
          onClick={() => navigate(`/profile/${current.userId}`)}
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <h4
          className={styles.userName}
          onClick={() => navigate(`/profile/${current.userId}`)}
        >
          {current.userNames}
        </h4>
      </div>
      {loaded ? (
        !fileType.includes("video") ? (
          <img
            src={current.url}
            alt="post"
            className={styles.image}
            onClick={() => {
              isHomePage ? navigate(`/details/${postId}`) : null;
            }}
          />
        ) : (
          <video className={styles.image} controls>
            <source src={current.url} />
          </video>
        )
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
      <div className={styles.optionsContainer}>
        <div className={styles.options}>
          <Tooltip title={showLikes()} arrow placement="bottom-start">
            <FavoriteBorderIcon
              sx={
                likedPost
                  ? { color: "red", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
              onClick={() => likeBtnHandler("like")}
            />
          </Tooltip>
          <Tooltip title="Dislike post" arrow>
            <HeartBrokenIcon
              sx={
                dislikedPost
                  ? { color: "red", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
              onClick={() => likeBtnHandler("dislike")}
            />
          </Tooltip>
          <ChatBubbleOutlineIcon
            onClick={() => {
              isHomePage ? navigate(`/details/${postId}`) : null;
            }}
          />
        </div>
        {postOwner === currentUserId ? (
          <Tooltip title="Delete post" arrow>
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
