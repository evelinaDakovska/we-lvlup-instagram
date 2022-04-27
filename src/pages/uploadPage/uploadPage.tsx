/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { addSinglePost } from "utils/postSettings/postSettings";
import styles from "./uploadPage.module.scss";

function UploadPage(): JSX.Element {
  const [uploadedPhotoURL, setUploadedPhotoURL] = useState<string>();
  const [uploadedPhoto, setUploadedPhoto] = useState<File>();
  const [description, setDescription] = useState<string>();
  const navigate = useNavigate();

  function uploadHandler() {
    if (uploadedPhoto && description && uploadedPhotoURL) {
      addSinglePost(uploadedPhoto, description, uploadedPhotoURL);
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
