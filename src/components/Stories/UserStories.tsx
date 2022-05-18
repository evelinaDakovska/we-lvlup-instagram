/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import { getUserAvatar } from "utils/userSettings/userAuth";
import styles from "./Stories.module.scss";

function UserStories(props: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [counter, setCounter] = useState(0);
  const data = props.storyData;

  useEffect(() => {
    const getAvatar = async () => {
      const currentAvatar = await getUserAvatar(props.userId);
      setAvatar(currentAvatar);
    };
    getAvatar();
  }, [props.userId]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (openModal) {
      const timer = setInterval(() => {
        if (progress !== 110) {
          setProgress((prevProgress) => prevProgress + 10);
        }
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [openModal]);

  useEffect(() => {
    if (progress === 110) {
      if (data[counter + 1]) {
        setCounter((prev) => prev + 1);
      } else {
        setOpenModal(false);
        setCounter(0);
      }
      setProgress(0);
    }
  }, [counter, data, progress]);

  return (
    <div className={styles.storyContainer}>
      <IconButton
        onClick={() => {
          setOpenModal(true);
        }}
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Avatar src={avatar} alt="User avatar" />
        {/*         <div className={styles.storyTitle}>{data.userName}</div>
         */}{" "}
      </IconButton>
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
            <LinearProgress variant="determinate" value={progress} />
            <img
              className={styles.uploadedPhoto}
              src={data[counter]}
              alt="avatar"
            />
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}

export default UserStories;
