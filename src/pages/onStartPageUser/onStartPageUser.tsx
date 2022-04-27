import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import styles from "./onStartPageUser.module.scss";

function UserStartPage(): JSX.Element {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      const allPosts: Array<any> = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
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
          return (
            <>
              <h5>{current.description}</h5>
              <img src={current.url} alt="post" className={styles.image} />
            </>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default UserStartPage;
