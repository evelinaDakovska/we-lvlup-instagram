import { useState } from "react";

import styles from "./registerPage.module.scss";
import SetEmailPassword from "./setEmailPassword";
import SetNames from "./setNames";
import SetAvatar from "./setAvatar";

function RegisterPage(): JSX.Element {
  const [navigationStep, setNavigationStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    avatar: "",
  });

  function onNextStep(nextStep: number) {
    setNavigationStep(nextStep);
  }

  function setUserInformation(updatedInfo: Record<string, unknown>) {
    const newInfo = { ...userInfo, ...updatedInfo };
    setUserInfo(newInfo);
  }

  return (
    <div className={styles.regContainer}>
      <h1>Register</h1>
      <button
        type="button"
        onClick={() => {
          if (navigationStep > 0) {
            setNavigationStep(navigationStep - 1);
          }
        }}
      >
        Back
      </button>
      {navigationStep === 0 ? (
        <SetEmailPassword
          navigationStep={navigationStep}
          onNextStep={onNextStep}
          userInfo={userInfo}
          setUserInformation={setUserInformation}
        />
      ) : navigationStep === 1 ? (
        <SetNames
          navigationStep={navigationStep}
          onNextStep={onNextStep}
          userInfo={userInfo}
          setUserInformation={setUserInformation}
        />
      ) : (
        <SetAvatar
          navigationStep={navigationStep}
          onNextStep={onNextStep}
          userInfo={userInfo}
          setUserInformation={setUserInformation}
        />
      )}
    </div>
  );
}

export default RegisterPage;
