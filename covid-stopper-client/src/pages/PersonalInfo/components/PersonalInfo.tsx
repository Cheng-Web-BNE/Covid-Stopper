import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import "./PersonalInfo.scss";
import { PersonalInfoCards } from "./PersonalInfoCards";
import avatarDefault from "../../../assets/avatar-demo.png";
import { mailOpen, arrowForwardOutline } from "ionicons/icons";
import {
  HOME_URL,
  PERSONAL_INFO_URL,
  SELF_CHECK_URL,
} from "../../../routes/URLMAP";
import { Link } from "react-router-dom";
import { getAuth } from "../../../utils/auth";
import { generalMemberRead } from "../../../api/user";
import SideMenu from "../../Home/components/SideMenu";
interface LoadInfoProps {
  currStep: number;
  stepHandler: (step: number) => void;
}

const PersonalInfo: React.FC<LoadInfoProps> = ({ currStep, stepHandler }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [error, setError] = useState<string>();
  const handleRead = async () => {
    setError("");
    const formDataRead = {
      token: await getAuth(),
    };
    try {
      const response = await generalMemberRead(formDataRead);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      stepHandler(currStep + 1);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
  };
  useEffect(() => {
    handleRead();
  }, []);

  return (
    <IonPage>
      <SideMenu />
      <div className="ion-page personal-info" id="main-content">
        <IonHeader>
          <IonToolbar color="tertiary">
            <div className="personal-info__toolbar">
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle className="ion-text-center">
                Personal Information
              </IonTitle>
              <IonButtons className="ion-padding-end" slot="end">
                <IonIcon icon={mailOpen} />
              </IonButtons>
            </div>
            <div className="personal-info__user">
              <IonAvatar slot="start">
                <img src={avatarDefault} alt="avatar" />
              </IonAvatar>
              <div className="personal-info__user-info">
                <p className="personal-info__user-info-name">
                  {" "}
                  {firstName} {lastName}
                </p>
                <p>Brisbane | ID: 23453</p>
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
        <PersonalInfoCards />
      </div>
    </IonPage>
  );
};

export default PersonalInfo;
