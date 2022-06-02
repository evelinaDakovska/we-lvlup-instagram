/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import styles from "./registerPage.module.scss";

function SetAvatar(props: any): JSX.Element {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>();
  const [uploadedAvatar, setUploadedAvatar] = useState<File>();
  const [uploadedURL, setUploadedURL] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);

  const listRef = ref(storage, "/default avatars");
  useEffect(() => {
    const getAvatars = async (): Promise<void> => {
      const allAvatars: Array<Promise<string>> = [];
      const response = await listAll(listRef);
      response.items.forEach((avatar) => {
        const url = getDownloadURL(avatar);
        allAvatars.push(url);
      });
      let promise = await Promise.all(allAvatars);
      if (props.uploadedAvatar) {
        promise = [...promise, props.userInfo.avatar];
      }
      setAvatars(promise);
    };
    getAvatars();
  }, []);

  useEffect(() => {
    if (props.userInfo.avatar) {
      setSelectedAvatar(props.userInfo.avatar);
    }
    if (props.uploadedAvatar) {
      setUploadedAvatar(props.userInfo.avatar);
    }
  }, []);

  useEffect(() => {
    if (uploadedURL) {
      setAvatars((prev) => [...prev, uploadedURL]);
    }
  }, [uploadedURL]);

  function nextPage() {
    if (!selectedAvatar) {
      setAlert(true);
      return;
    }
    setAlert(false);
    props.onNextStep(props.navigationStep + 1);
    props.setUserInformation({ avatar: selectedAvatar });
    props.setUploadedAvatar(uploadedAvatar);
  }

  return (
    <div>
      <div className={styles.avatarsContainer}>
        {avatars.map((current) => {
          return (
            <label key={current} className={styles.hiddenRadio}>
              <input
                type="radio"
                name="test"
                value={current}
                checked={selectedAvatar === current}
                onChange={(event) => setSelectedAvatar(event.target.value)}
              />
              <img src={current} alt="avatar" />
            </label>
          );
        })}
      </div>
      <div className={styles.btnContainer}>
        <label>
          Upload avatar
          <input
            type="file"
            name="myAvatar"
            id={styles.uploadInput}
            onChange={(event) => {
              if (event.target.files) {
                setUploadedAvatar(event.target.files[0]);
                setUploadedURL(URL.createObjectURL(event.target.files[0]));
              }
            }}
          />
        </label>
        <Button variant="contained" onClick={nextPage}>
          Next
        </Button>
      </div>
      {alert ? (
        <div style={{ color: "red" }}>Please select profile picture</div>
      ) : null}
    </div>
  );
}

export default SetAvatar;
