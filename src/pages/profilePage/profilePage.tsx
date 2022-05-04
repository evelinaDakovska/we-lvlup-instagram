import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import PostCard from "components/PostCard/PostCard";
import { signOutFunc } from "../../utils/userSettings/userAuth";
import { db } from "../../utils/firebaseConfig";
import styles from "./profilePage.module.scss";

function ProfilePage(): JSX.Element {
  const [posts, setPosts] = useState<any>([]);
  const [userData, setUserData] = useState<any>({});
  const [followers, setFollowers] = useState<any>([]);
  const [followed, setFollowed] = useState<any>([]);
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

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setFollowers(docSnap.data().followers);
        setFollowed(docSnap.data().followed);
      } else {
        console.log("No such document!");
      }
    };

    getPosts();
    getUserData();
  }, [profileUserId]);

  const navigate = useNavigate();
  function onSignOut() {
    navigate("/");
    signOutFunc();
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
          <br />
          <span style={{ fontWeight: "bold" }}>{followers.length}</span> people
          follow {userData.firstName}
          <br />
          {userData.firstName} follows:{" "}
          <span style={{ fontWeight: "bold" }}>{followed.length}</span> people
        </div>
        {profileUserId === currentUserId ? (
          <Button
            variant="contained"
            onClick={onSignOut}
            sx={{ width: "40px", height: "40px", minWidth: "0", padding: "0" }}
          >
            <LogoutIcon />
          </Button>
        ) : null}
      </div>
      <div className={styles.contentContainer}>
        {posts.map((current: any) => {
          return (
            <PostCard postData={current} postId={current.id} key={current.id} />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
