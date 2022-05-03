/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";
import { likeHandler } from "utils/postSettings/likeHandler";
import { db } from "../../utils/firebaseConfig";
import styles from "./detailPage.module.scss";

function DetailPage(): JSX.Element {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>([]);
  const [postOwner, setPostOwner] = useState<string>();
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const currentUserId = useSelector(
    (state: RootStateOrAny) => state.auth.userId
  );

  useEffect(() => {
    const getPostData = async (): Promise<void> => {
      if (db && postId) {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPostData(docSnap.data());
          setPostOwner(docSnap.data().userId);
        } else {
          console.log("No such document!");
        }
      }
    };
    getPostData();
  }, []);

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

  function likeBtnHandler(action: string) {
    console.log(action);

    setLikedPost((prevValue) => !prevValue);
    likeHandler(postId!, currentUserId);
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.singlePost}>
        <div className={styles.userData}>
          <Avatar
            src={postData.userAvatar}
            alt="User avatar"
            onClick={() => navigate(`/profile/${postData.userId}`)}
            sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <h4 onClick={() => navigate(`/profile/${postData.userId}`)}>
            {postData.userNames}
          </h4>
        </div>
        <img src={postData.url} alt="post" className={styles.image} />
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
                sx={likedPost ? { color: "red" } : null}
                onClick={() => likeBtnHandler("dislike")}
              />
            </Tooltip>
          </div>
          {postOwner === currentUserId ? (
            <Tooltip title="Delete post">
              <DeleteIcon onClick={deletePost} />
            </Tooltip>
          ) : null}
        </div>
        <div className={styles.description}>
          <span>{postData.userNames}</span>
          {postData.description}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailPage;
