/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import styles from "./registerPage.module.scss";

function SetAvatar(props: any): JSX.Element {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>();
  const [uploadedAvatar, setUploadedAvatar] = useState<string>();

  useEffect(() => {
    if (props.userInfo.avatar) {
      setSelectedAvatar(props.userInfo.avatar);
      setUploadedAvatar(props.userInfo.avatar);
    }
  }, []);

  const listRef = ref(storage, "/default avatars");
  useEffect(() => {
    const getAvatars = async (): Promise<void> => {
      const allAvatars: Array<string> = [];
      listAll(listRef)
        .then((response) => {
          response.items.forEach((avatar, i) => {
            getDownloadURL(avatar).then((url) => {
              allAvatars.push(url);
              if (i === response.items.length - 1) {
                setAvatars(allAvatars);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAvatars();
  }, []);

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);
    props.setUserInformation({ avatar: selectedAvatar });
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
          <label key={uploadedAvatar} className={styles.hiddenRadio}>
            <input
              type="radio"
              name="test"
              value={uploadedAvatar}
              onChange={(event) => setSelectedAvatar(event.target.value)}
              key={uploadedAvatar}
            />
            <img
              className={styles.uploadedAvatar}
              src={uploadedAvatar}
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
                setUploadedAvatar(URL.createObjectURL(event.target.files[0]));
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
