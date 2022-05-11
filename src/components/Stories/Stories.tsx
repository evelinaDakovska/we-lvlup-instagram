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
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore/lite";
import { addSingleStory } from "utils/postSettings/postSettings";
import { db } from "../../utils/firebaseConfig";
import UserStories from "./UserStories";
import styles from "./Stories.module.scss";

function Stories(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [stories, setStories] = useState<any>([]);
  const [uploadedStoryURL, setUploadedStoryURL] = useState<string>("");
  const [uploadedStory, setUploadedStory] = useState<File>();
  const [disable, setDisable] = useState<boolean>(false);
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const firstName = useSelector(
    (state: RootStateOrAny) => state.auth.firstName
  );
  const userAvatar = useSelector((state: RootStateOrAny) => state.auth.avatar);
  const navigate = useNavigate();

  useEffect(() => {
    const getStories = async (): Promise<void> => {
      const allStories: Array<any> = [];
      const storiesRef = collection(db, "stories");
      const now = Date.now();
      const cutoff = now - 24 * 60 * 60 * 1000;
      const docRef = query(
        storiesRef,
        where("timestamp", ">", cutoff),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        allStories.push(data);
      });
      const promise = await Promise.all(allStories);
      setStories(promise);
    };
    getStories();
  }, []);

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

  return (
    <>
      <Box sx={{ width: "100%", height: "80px", display: "flex" }}>
        <AppBar
          sx={{
            backgroundColor: "white",
            color: "black",
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "scroll",
          }}
          position="fixed"
        >
          <Toolbar
            sx={{
              height: "100%",
              padding: "5px",
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
                        setUploadedStoryURL(
                          URL.createObjectURL(event.target.files[0])
                        );
                        setUploadedStory(event.target.files[0]);
                        setOpenModal(true);
                      }
                    }}
                  />
                </label>
              </IconButton>
              <div className={styles.storyTitle}>Your story</div>
            </IconButton>
            {stories.map((current: any) => {
              return (
                <UserStories
                  storyData={current}
                  storyId={current.id}
                  key={current.id}
                />
              );
            })}
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
              width: "90%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: "15px",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70%",
            }}
          >
            {!uploadedStory!.type.includes("video") ? (
              <img
                className={styles.uploadedPhoto}
                src={uploadedStoryURL}
                alt="avatar"
              />
            ) : (
              <video className={styles.uploadedPhoto} controls>
                <source src={uploadedStoryURL} />
              </video>
            )}
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
