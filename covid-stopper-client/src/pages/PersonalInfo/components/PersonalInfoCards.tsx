import React from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonLabel,
  IonIcon,
  IonButton,
} from "@ionic/react";
import {
  alertCircleOutline,
  notificationsOutline,
  calendarOutline,
  personCircleOutline,
  navigateOutline,
  pinOutline,
  arrowForwardOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import {
  GENERAL_UPDATE_INFO_URL,
  MY_TESTS_URL,
  SELF_CHECK_URL,
} from "../../../routes/URLMAP";

interface PersonalInfoCardsProps {}

export const PersonalInfoCards: React.FC<PersonalInfoCardsProps> = ({}) => {
  return (
    <IonGrid className="personal-info__grid">
      <IonRow>
        <IonCol className="personal-info__col ion-padding-bottom" size="4">
          <Link className="personal-info__link-wrapper" to={MY_TESTS_URL}>
            <IonCard className="personal-info__card">
              <IonIcon
                className="personal-info__card-icon calendar"
                icon={calendarOutline}
              />
            </IonCard>
            <IonLabel className="personal-info__label">My Tests</IonLabel>
          </Link>
        </IonCol>
        <IonCol className="personal-info__col ion-padding-bottom" size="4">
          <Link className="personal-info__link-wrapper" to={SELF_CHECK_URL}>
            <IonCard className="personal-info__card">
              <IonIcon
                className="personal-info__card-icon alert"
                icon={alertCircleOutline}
              />
            </IonCard>
            <IonLabel className="personal-info__label">My Advices</IonLabel>
          </Link>
        </IonCol>
        <IonCol className="personal-info__col ion-padding-bottom" size="4">
          <Link className="personal-info__link-wrapper" to={SELF_CHECK_URL}>
            <IonCard className="personal-info__card">
              <IonIcon
                className="personal-info__card-icon notifications"
                icon={notificationsOutline}
              />
            </IonCard>
            <IonLabel className="personal-info__label">Notifications</IonLabel>
          </Link>
        </IonCol>
      </IonRow>
      <Link to={GENERAL_UPDATE_INFO_URL}>
        <IonRow>
          <IonButton
            className="personal-info__button"
            color="light"
            expand="full"
            size="large"
          >
            <IonIcon
              className="personal-info__card-icon person"
              icon={personCircleOutline}
            />
            My Profile
          </IonButton>
        </IonRow>
      </Link>
      {/* <IonRow>
        <IonButton
          className="personal-info__button"
          color="light"
          expand="full"
          size="large"
        >
          <IonIcon className="personal-info__card-icon pin" icon={pinOutline} />
          My Address
        </IonButton>
      </IonRow>
      <IonRow>
        <IonButton
          className="personal-info__button"
          color="light"
          expand="full"
          size="large"
        >
          <IonIcon
            className="personal-info__card-icon navigate"
            slot="start"
            icon={navigateOutline}
          />
          <IonLabel slot="start">Past Locations</IonLabel>
        </IonButton>
      </IonRow> */}
    </IonGrid>
  );
};
