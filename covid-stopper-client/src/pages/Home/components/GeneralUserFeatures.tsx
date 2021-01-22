import {
  IonCard,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonToast,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  flaskOutline,
  mapOutline,
  qrCode,
} from "ionicons/icons";
import React, { useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  GENERAL_UPDATE_INFO_URL,
  LIVE_TRACING_URL,
  SELF_CHECK_URL,
  TESTING_URL,
} from "../../../routes/URLMAP";
import { UserInfo } from "./Home";

interface GeneralUserFeaturesProps extends RouteComponentProps {
  userInfo: UserInfo | undefined;
  setShowHealthCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneralUserFeatures: React.FC<GeneralUserFeaturesProps> = ({
  userInfo,
  setShowHealthCodeModal,
  history,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleHealthCode = () => {
    if (!userInfo || !userInfo.address) {
      setShowToast(true);
      return;
    }
    setShowHealthCodeModal(true);
  };

  return (
    <>
      <IonRow className="dashboard__grid__row">
        <IonCol className="dashboard__grid__row__col" size="6">
          <Link className="link-wrapper" to={TESTING_URL}>
            <IonCard className="card">
              <IonIcon
                className="card-icon check"
                icon={checkmarkCircleOutline}
              />
            </IonCard>
            <IonLabel className="label">Test</IonLabel>
          </Link>
        </IonCol>
        <IonCol
          className="dashboard__grid__row__col ion-padding-bottom"
          size="6"
        >
          <Link className="link-wrapper" to={SELF_CHECK_URL}>
            <IonCard className="card">
              <IonIcon className="card-icon flask" icon={flaskOutline} />
            </IonCard>
            <IonLabel className="label">Symptom Checker</IonLabel>
          </Link>
        </IonCol>
      </IonRow>
      <IonRow className="dashboard__grid__row">
        <IonCol className="dashboard__grid__row__col" size="6">
          <div className="link-wrapper">
            <IonCard button onClick={handleHealthCode} className="card">
              <IonItem lines="none">
                <IonIcon className="card-icon qrcode" icon={qrCode} />
              </IonItem>
            </IonCard>
            <IonLabel className="label">Health Code</IonLabel>
          </div>
        </IonCol>
      </IonRow>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Please update your address first"
        buttons={[
          {
            side: "start",
            icon: "star",
            text: "do it now",
            handler: () => {
              history.push(GENERAL_UPDATE_INFO_URL);
            },
          },
          {
            text: "Later",
            role: "cancel",
          },
        ]}
      />
    </>
  );
};

export default withRouter(GeneralUserFeatures);
