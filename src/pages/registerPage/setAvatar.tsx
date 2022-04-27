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

  useEffect(() => {
    if (props.userInfo.avatar) {
      setSelectedAvatar(props.userInfo.avatar);
      setUploadedAvatar(props.userInfo.avatar);
    }
  }, []);

  const listRef = ref(storage, "/default avatars");
  useEffect(() => {
    const getAvatars = async (): Promise<void> => {
      const allAvatars: Array<Promise<string>> = [];
      const response = await listAll(listRef);
      response.items.forEach((avatar) => {
        const url = getDownloadURL(avatar);
        allAvatars.push(url);
      });
      const promise = await Promise.all(allAvatars);
      setAvatars(promise);
    };
    getAvatars();
  }, []);

  function nextPage() {
    if (!selectedAvatar) {
      alert("Please select profile picture");
      return;
    }
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
                onChange={(event) => setSelectedAvatar(event.target.value)}
              />
              <img src={current} alt="avatar" />
            </label>
          );
        })}
        {uploadedAvatar && (
          <label key={uploadedURL} className={styles.hiddenRadio}>
            <input
              type="radio"
              name="test"
              value={uploadedURL}
              onChange={(event) => setSelectedAvatar(event.target.value)}
              key={uploadedURL}
            />
            <img
              className={styles.uploadedAvatar}
              src={uploadedURL}
              alt="avatar"
            />
          </label>
        )}
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
    </div>
  );
}

export default SetAvatar;
