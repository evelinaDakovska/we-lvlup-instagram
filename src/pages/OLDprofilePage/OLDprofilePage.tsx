import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import PostCard from "components/PostCard/PostCard";
import { signOutFunc } from "../../utils/userSettings/userAuth";
import styles from "./OLDprofilePage.module.scss";
import { db } from "../../utils/firebaseConfig";

function ProfilePage(): JSX.Element {
  const [posts, setPosts] = useState<any>([]);
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);

  useEffect(() => {
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
      <Button variant="contained" onClick={onSignOut}>
        LogOut
      </Button>
      <div className={styles.contentContainer}>
        {posts.map((current: any) => {
          return <PostCard postData={current} key={current.id} />;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
