/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import styles from "./registerPage.module.scss";

function SetAvatar(props: any): JSX.Element {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<any>();

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
    console.log(selectedAvatar);

    props.onNextStep(props.navigationStep + 1);

    props.setUserInformation({ avatar: selectedAvatar });
  }

  return (
    <div className={styles.avatarsContainer}>
      {avatars.map((current) => {
        return (
          <label className={styles.hiddenRadio} key={current}>
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
      <Button variant="contained" onClick={nextPage}>
        Next
      </Button>
    </div>
  );
}

export default SetAvatar;
