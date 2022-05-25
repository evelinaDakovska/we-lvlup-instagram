import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import PostCard from "components/PostCard/PostCard";
import Comments from "components/Comments/Comments";
import { db } from "../../utils/firebaseConfig";
import styles from "./detailPage.module.scss";

function DetailPage(): JSX.Element {
  const { postId } = useParams();
  const [postData, setPostData] = useState<any>();

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
      {postData ? (
        <>
          <PostCard postData={postData} postId={postId} key={postId} />
          <Comments postId={postId} />
        </>
      ) : null}
    </div>
  );
}

export default DetailPage;
