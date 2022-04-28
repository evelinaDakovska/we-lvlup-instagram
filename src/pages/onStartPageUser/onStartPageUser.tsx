import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import PostCard from "components/PostCard/PostCard";
import { db } from "../../utils/firebaseConfig";
import styles from "./onStartPageUser.module.scss";

function UserStartPage(): JSX.Element {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      const allPosts: Array<any> = [];
      const postsRef = collection(db, "posts");
      const docRef = query(postsRef, orderBy("timestamp", "desc"));
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

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentContainer}>
        {posts.map((current: any) => {
          return <PostCard postData={current} key={current.id} />;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default UserStartPage;
