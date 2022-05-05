/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import styles from "./Stories.module.scss";

function UserStories(props: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const data = props.storyData;

  return (
    <div className={styles.storyContainer}>
      <IconButton
        onClick={() => {
          setOpenModal((prev) => !prev);
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
