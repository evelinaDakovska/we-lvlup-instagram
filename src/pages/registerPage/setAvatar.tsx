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
          response.items.forEach((avatar) => {
            getDownloadURL(avatar).then((url) => {
              allAvatars.push(url);
            });
          });
          setAvatars(allAvatars);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAvatars();
    console.log(avatars);
  }, [avatars]);

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);

    props.setUserInformation({ avatar: selectedAvatar });
  }

  return (
    <div className={styles.hiddenradio}>
      {avatars.map((current) => {
        return (
          <label>
            <img src={current} alt="avatar" />
            <input
              type="radio"
              name="test"
              value="small"
              onChange={(event) => setSelectedAvatar(event.target.value)}
            />
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
