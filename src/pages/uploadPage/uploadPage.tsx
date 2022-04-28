/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { RootStateOrAny, useSelector } from "react-redux";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { addSinglePost } from "utils/postSettings/postSettings";
import styles from "./uploadPage.module.scss";

function UploadPage(): JSX.Element {
  const [uploadedPhotoURL, setUploadedPhotoURL] = useState<string>();
  const [uploadedPhoto, setUploadedPhoto] = useState<File>();
  const [description, setDescription] = useState<string>();
  const navigate = useNavigate();
  const userAvatar = useSelector((state: RootStateOrAny) => state.auth.avatar);
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const firstName = useSelector(
    (state: RootStateOrAny) => state.auth.firstName
  );
  const lastName = useSelector((state: RootStateOrAny) => state.auth.lastName);

  async function uploadHandler() {
    if (uploadedPhoto && description && uploadedPhotoURL) {
      await addSinglePost(
        uploadedPhoto,
        description,
        uploadedPhotoURL,
        userAvatar,
        userId,
        firstName,
        lastName
      );
    }
    navigate("/");
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentContainer}>
        {uploadedPhotoURL && (
          <>
            <img
              className={styles.uploadedPhoto}
              src={uploadedPhotoURL}
              alt="avatar"
            />
            <TextField
              label="Description"
              id="description"
              variant="outlined"
              value={description}
              sx={{ marginTop: "5%", width: "80%" }}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={uploadHandler}
              sx={{ width: "60%" }}
            >
              Upload
            </Button>
          </>
        )}
        <Button variant="contained" sx={{ width: "60%" }}>
          <label>
            Select Photo
            <input
              type="file"
              name="myAvatar"
              style={{ display: "none" }}
              onChange={(event) => {
                if (event.target.files) {
                  setUploadedPhotoURL(
                    URL.createObjectURL(event.target.files[0])
                  );
                  setUploadedPhoto(event.target.files[0]);
                }
              }}
            />
          </label>
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default UploadPage;
