/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  doc,
} from "firebase/firestore/lite";
import { RootStateOrAny, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { follow } from "utils/userSettings/follow";
import { getUserNames } from "../../utils/postSettings/postSettings";
import { signOutFunc } from "../../utils/userSettings/userAuth";
import { db } from "../../utils/firebaseConfig";
import styles from "./profilePage.module.scss";

function ProfilePage(): JSX.Element {
  const [posts, setPosts] = useState<any>([]);
  const [userData, setUserData] = useState<any>({});
  const [followers, setFollowers] = useState<any>([]);
  const [followersNames, setFollowersNames] = useState<any>([]);
  const [followed, setFollowed] = useState<any>([]);
  const [followedNames, setFollowedNames] = useState<any>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { profileUserId } = useParams();
  const currentUserId = useSelector(
    (state: RootStateOrAny) => state.auth.userId
  );

  let userId: string;

  useEffect(() => {
    if (profileUserId === currentUserId) {
      userId = currentUserId;
    } else {
      userId = profileUserId!;
    }

    const getPosts = async (): Promise<void> => {
      const allPosts: Array<any> = [];
      const postsRef = collection(db, "posts");
      const docRef = query(
        postsRef,
        orderBy("timestamp", "desc"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((post) => {
        let data = post.data();
        data = { ...data, id: post.id };
        allPosts.push(data);
      });
      const promise = await Promise.all(allPosts);
      setPosts(promise);
    };

    const getUserData = async (): Promise<void> => {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      setUserData(docSnap.data());
      setFollowers(docSnap.data()?.followers);
      setFollowed(docSnap.data()?.followed);
    };

    getPosts();
    getUserData();
  }, [profileUserId]);

  const didMount = useRef(false);

  useEffect(() => {
    if (followers.includes(currentUserId)) {
      setIsFollowing(true);
    }
    if (didMount.current) {
      const getFollowersNames = async (): Promise<void> => {
        const usersFollowersLiked = await getUserNames(followers);
        setFollowersNames(usersFollowersLiked);
      };
      getFollowersNames();
    } else {
      didMount.current = true;
    }
  }, [followers]);

  useEffect(() => {
    if (didMount.current) {
      const getFollowedNames = async (): Promise<void> => {
        const usersFollowedLiked = await getUserNames(followed);
        setFollowedNames(usersFollowedLiked);
      };
      getFollowedNames();
    } else {
      didMount.current = true;
    }
  }, [followed]);

  const navigate = useNavigate();
  function onSignOut() {
    navigate("/");
    signOutFunc();
  }

  function followHandler() {
    setIsFollowing((prevValue) => !prevValue);
    const followersArray = [...followers];
    if (followers.includes(currentUserId)) {
      const index = followers.indexOf(currentUserId);
      followersArray.splice(index, 1);
    } else {
      followersArray.push(currentUserId);
    }
    setFollowers(followersArray);
    follow(currentUserId, profileUserId!);
  }

  function showFollowers() {
    if (followersNames.length > 0) {
      return (
        <>
          {followersNames.map((currentName: string) => {
            return <div key={currentName}>{currentName}</div>;
          })}
        </>
      );
    }
    return "";
  }

  function showFollowing() {
    if (followedNames.length > 0) {
      return (
        <>
          {followedNames.map((currentName: string) => {
            return <div key={currentName}>{currentName}</div>;
          })}
        </>
      );
    }
    return "";
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.userData}>
        <img src={userData.avatar} alt="avatar" className={styles.avatar} />
        <div>
          <span style={{ fontWeight: "bold" }}>
            {userData.firstName} {userData.lastName}
          </span>
          <br />
          {userData.firstName} has{" "}
          <span style={{ fontWeight: "bold" }}>{userData.postsCount}</span>{" "}
          posts
          <Tooltip title={showFollowers()} arrow placement="bottom-start">
            <div>
              <span style={{ fontWeight: "bold" }}>{followers.length}</span>{" "}
              people follow {userData.firstName}
            </div>
          </Tooltip>
          <Tooltip title={showFollowing()} arrow placement="bottom-start">
            <div>
              {userData.firstName} follows{" "}
              <span style={{ fontWeight: "bold" }}>{followed.length}</span>{" "}
              people
            </div>
          </Tooltip>
        </div>
        {profileUserId === currentUserId ? (
          <Button
            variant="contained"
            onClick={onSignOut}
            sx={{ width: "40px", height: "40px", minWidth: "0", padding: "0" }}
          >
            <LogoutIcon />
          </Button>
        ) : (
          <Tooltip
            title={
              isFollowing ? "Already following, wanna unfollow?" : "Follow"
            }
          >
            <Button
              variant={isFollowing ? "contained" : "outlined"}
              onClick={followHandler}
              sx={{
                width: "40px",
                height: "40px",
                minWidth: "0",
                padding: "0",
              }}
            >
              <BookmarkIcon />
            </Button>
          </Tooltip>
        )}
      </div>
      <div className={styles.contentContainer}>
        {posts.map((current: any) => {
          return (
            <img
              src={current.url}
              alt="post"
              key={current.id}
              onClick={() => {
                navigate(`/details/${current.id}`);
              }}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
