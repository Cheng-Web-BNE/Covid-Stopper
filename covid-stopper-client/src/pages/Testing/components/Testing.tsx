import React from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonGrid,
  IonCol,
} from "@ionic/react";
import "./Testing.scss";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import {
  CLINIC_URL,
  DRIVE_URL,
  HOME_URL,
  SWAB_TEST_URL,
  MY_TESTS_URL,
} from "../../../routes/URLMAP";
import { Link } from "react-router-dom";
import SideMenu from "../../Home/components/SideMenu";

const Testing: React.FC = () => {
  return (
    <IonPage>
      <SideMenu />

      <div className="ion-page testing" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <Link className="news-section-link" to={HOME_URL}>
                <IonButton>Back</IonButton>
              </Link>
            </IonButtons>
            <IonButtons slot="primary">
              <IonButton>
                <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Testings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonCol>
            <Link to={SWAB_TEST_URL}>
              <IonButton
                className="testing__button"
                color="light"
                expand="block"
              >
                Swab Kit Test
              </IonButton>
            </Link>
          </IonCol>
          <IonCol>
            <Link to={CLINIC_URL}>
              <IonButton
                className="testing__button"
                color="light"
                expand="block"
              >
                Clinic Test
              </IonButton>
            </Link>
          </IonCol>
          <IonCol>
            <Link to={DRIVE_URL}>
              <IonButton
                className="testing__button"
                color="light"
                expand="block"
              >
                Drive Through Test
              </IonButton>
            </Link>
          </IonCol>
          <IonCol>
            <Link to={MY_TESTS_URL}>
              <IonButton
                className="testing__button"
                color="light"
                expand="block"
              >
                My Tests
              </IonButton>
            </Link>
          </IonCol>
        </IonGrid>
      </div>
    </IonPage>
  );
};

export default Testing;
