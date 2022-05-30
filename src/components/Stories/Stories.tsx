/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/media-has-caption */
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  doc,
} from "firebase/firestore/lite";
import { addSingleStory } from "utils/postSettings/postSettings";
import { getUserAvatar } from "utils/userSettings/userAuth";
import { db } from "../../utils/firebaseConfig";
import UserStories from "./UserStories";
import styles from "./Stories.module.scss";

function Stories(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [stories, setStories] = useState<any>([]);
  const [followed, setFollowed] = useState<any>([]);
  const [uploadedStoryURL, setUploadedStoryURL] = useState<string>("");
  const [uploadedStory, setUploadedStory] = useState<File | Blob>();
  const [disable, setDisable] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState("");
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const firstName = useSelector(
    (state: RootStateOrAny) => state.auth.firstName
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getAvatar = async () => {
      const currentAvatar = await getUserAvatar(userId);
      setUserAvatar(currentAvatar);
    };
    getAvatar();
  }, []);

  useEffect(() => {
    const getFollowers = async (): Promise<void> => {
      const allFollowers: Array<any> = [];
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.data) {
        userSnap.data()!.followed.forEach((foll: string) => {
          allFollowers.push(foll);
        });
      }
      const promise = await Promise.all(allFollowers);
      setFollowed([...promise, userId]);
    };
    getFollowers();
  }, []);

  useEffect(() => {
    const getStories = async (): Promise<void> => {
      const allStories: Array<any> = [];
      const storiesRef = collection(db, "stories");
      const now = Date.now();
      const cutoff = now - 24 * 60 * 60 * 1000;
      if (followed.length > 0) {
        const docRef = query(
          storiesRef,
          where("userId", "in", followed),
          where("timestamp", ">", cutoff),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((cdoc) => {
          let data = cdoc.data();
          data = { ...data, id: cdoc.id };
          allStories.push(data);
        });
        const promise = await Promise.all(allStories);
        const sortedStories: Record<string, Array<string>> = {};
        if (promise.length > 0) {
          for (let i = 0; i < promise.length; i++) {
            const currentUrl = promise[i].url;
            const currentId: string = promise[i].userId;

            if (currentId in sortedStories) {
              sortedStories[currentId] = [
                ...sortedStories[currentId],
                currentUrl,
              ];
            } else {
              sortedStories[currentId] = [currentUrl];
            }
          }
        }

        setStories(sortedStories);
      }
    };
    getStories();
  }, [followed]);

  async function addNewStories() {
    setDisable(true);
    await addSingleStory(
      uploadedStory!,
      userAvatar,
      userId,
      firstName,
      uploadedStoryURL
    );
    navigate(0);
  }

  function compressImg(file: any) {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.6,
      success: (compressedResult) => {
        setUploadedStory(compressedResult);
      },
    });
    setUploadedStoryURL(URL.createObjectURL(file));
    setOpenModal(true);
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          display: "flex",
          padding: "0",
        }}
      >
        <AppBar
          sx={{
            backgroundColor: "white",
            color: "black",
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: "0",
          }}
          position="fixed"
        >
          <Toolbar
            sx={{
              height: "100%",
              padding: "0",
            }}
          >
            <IconButton
              sx={{
                p: 0,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                paddingRight: "3%",
              }}
            >
              <IconButton>
                <label>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <AddIcon
                        sx={{
                          backgroundColor: "#0092fc",
                          color: "white",
                          borderRadius: "50%",
                        }}
                      />
                    }
                  >
                    <Avatar src={userAvatar} alt="User avatar" />
                  </Badge>
                  <input
                    type="file"
                    name="myAvatar"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      if (event.target.files) {
                        compressImg(event.target.files[0]);
                      }
                    }}
                  />
                </label>
              </IconButton>
              <div className={styles.storyTitle}>Your story</div>
            </IconButton>
            {Object.entries(stories).map(([key, value]) => (
              <UserStories storyData={value} userId={key} key={key} />
            ))}
          </Toolbar>
        </AppBar>
      </Box>
      {openModal ? (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "@media (max-width: 768px)": {
                width: "90%",
              },
              width: "40%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: "15px",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70%",
            }}
          >
            {uploadedStory ? (
              !uploadedStory.type.includes("video") ? (
                <img
                  className={styles.uploadedPhoto}
                  src={uploadedStoryURL}
                  alt="avatar"
                />
              ) : (
                <video className={styles.uploadedPhoto} controls>
                  <source src={uploadedStoryURL} />
                </video>
              )
            ) : null}
            <Button onClick={addNewStories} disabled={disable}>
              Upload
            </Button>
          </Box>
        </Modal>
      ) : null}
    </>
  );
}

export default Stories;
