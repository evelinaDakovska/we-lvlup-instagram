import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { useState, useEffect } from "react";
import PostCard from "components/PostCard/PostCard";
import { db } from "../../utils/firebaseConfig";
import styles from "./detailPage.module.scss";

function DetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postData, setPostData] = useState<any>([]);

  useEffect(() => {
    const getPostData = async (): Promise<void> => {
      if (db && postId) {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPostData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };
    getPostData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <PostCard postData={postData} postId={postId} key={postId} />
      <Footer />
    </div>
  );
}

export default DetailPage;
