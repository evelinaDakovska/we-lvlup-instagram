/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import styles from "./Stories.module.scss";

function UserStories(props: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const data = props.storyData;

  useEffect(() => {
    if (openModal) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 110 ? 0 : prevProgress + 10
        );
      }, 250);

      return () => {
        setProgress(0);
        clearInterval(timer);
      };
    }
    return () => {};
  }, [openModal]);

  return (
    <div className={styles.storyContainer}>
      <IconButton
        onClick={() => {
          setOpenModal(true);
          setTimeout(() => {
            setOpenModal(false);
          }, 3000);
        }}
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Avatar src={data.userAvatar} alt="User avatar" />
        <div className={styles.storyTitle}>{data.userName}</div>
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
            <LinearProgress variant="determinate" value={progress} />
            {!data!.fileMeta.includes("video") ? (
              <img
                className={styles.uploadedPhoto}
                src={data.url}
                alt="avatar"
              />
            ) : (
              <video className={styles.uploadedPhoto} controls>
                <source src={data.url} />
              </video>
            )}
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}

export default UserStories;
