import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import PostCard from "components/PostCard/PostCard";
import { signOutFunc } from "../../utils/userSettings/userAuth";
import { db } from "../../utils/firebaseConfig";
import styles from "./profilePage.module.scss";

function ProfilePage(): JSX.Element {
  const [posts, setPosts] = useState<any>([]);
  /*   const [userId, setUserId] = useState<string>("");
   */ const { profileUserId } = useParams();
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
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        allPosts.push(data);
      });
      const promise = await Promise.all(allPosts);
      setPosts(promise);
    };
    getPosts();
  }, []);

  const navigate = useNavigate();
  function onSignOut() {
    navigate("/");
    signOutFunc();
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div>Welcome</div>
      {profileUserId === currentUserId ? (
        <Button variant="contained" onClick={onSignOut}>
          LogOut
        </Button>
      ) : null}
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
