/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Compressor from "compressorjs";
import { RootStateOrAny, useSelector } from "react-redux";
import { addSinglePost } from "utils/postSettings/postSettings";
import styles from "./uploadPage.module.scss";

function UploadPage(): JSX.Element {
  const [uploadedPhotoURL, setUploadedPhotoURL] = useState<string>("");
  const [uploadedPhoto, setUploadedPhoto] = useState<File | Blob>();
  const description = useRef<HTMLInputElement>();
  const [disable, setDisable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const firstName = useSelector(
    (state: RootStateOrAny) => state.auth.firstName
  );
  const lastName = useSelector((state: RootStateOrAny) => state.auth.lastName);

  async function uploadHandler() {
    if (uploadedPhoto && description?.current!.value && uploadedPhotoURL) {
      setAlert(false);
      setIsLoading(true);
      setDisable(true);
      await addSinglePost(
        uploadedPhoto,
        description.current!.value,
        uploadedPhotoURL,
        userId,
        firstName,
        lastName
      );
    } else {
      setAlert(true);
      return;
    }
    navigate("/");
  }

  function compressImg(file: any) {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.6,
      success: (compressedResult) => {
        setUploadedPhoto(compressedResult);
      },
    });
    setUploadedPhotoURL(URL.createObjectURL(file));
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        {uploadedPhoto && (
          <>
            {!uploadedPhoto!.type.includes("video") ? (
              <img
                className={styles.uploadedPhoto}
                src={uploadedPhotoURL}
                alt="avatar"
              />
            ) : (
              <video className={styles.uploadedPhoto} controls>
                <source src={uploadedPhotoURL} />
              </video>
            )}
            <TextField
              type="text"
              label="Description"
              id="description"
              variant="outlined"
              sx={{
                width: "50%",
                marginTop: "1%",
                "@media (max-width: 768px)": {
                  marginTop: "5%",
                  width: "80%",
                },
              }}
              inputRef={description}
            />
            {!isLoading ? (
              <>
                {alert ? (
                  <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
                    Please add file and description
                  </div>
                ) : null}
                <Button
                  onClick={uploadHandler}
                  disabled={disable}
                  variant="contained"
                  sx={{
                    width: "20%",
                    "@media (max-width: 768px)": {
                      width: "60%",
                    },
                  }}
                >
                  Upload
                </Button>
              </>
            ) : null}
          </>
        )}
        {!isLoading ? (
          <Button variant="text">
            <label>
              Select Photo
              <input
                type="file"
                name="myAvatar"
                style={{ display: "none" }}
                onChange={(event) => {
                  if (event.target.files) {
                    compressImg(event.target.files[0]);
                  }
                }}
              />
            </label>
          </Button>
        ) : null}
        {isLoading ? (
          <div style={{ marginTop: "2%" }}>
            <span className={styles.loader} />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UploadPage;
