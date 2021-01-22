import React, { useState } from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonLabel,
  IonIcon,
  IonLoading,
} from "@ionic/react";
import { informationCircleOutline, newspaperOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { COVID_INFO_URL, NEWS_URL } from "../../../routes/URLMAP";
import { HealthCode } from "../../HealthCode/components/HealthCode";
import { UserInfo } from "./Home";
import { CommercialUserFeatures } from "./CommercialUserFeatures";
import GeneralUserFeatures from "./GeneralUserFeatures";

interface DashboardCardsProps {
  role: string | null;
  userInfo: UserInfo | undefined;
  isLoading: boolean;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  role,
  userInfo,
  isLoading,
}) => {
  const [showHealthCodeModal, setShowHealthCodeModal] = useState(false);

  const renderHealthCode = () =>
    isLoading ? (
      <IonLoading isOpen={true} message={"Please wait..."} />
    ) : (
      <HealthCode
        userInfo={userInfo!}
        setShowHealthCodeModal={setShowHealthCodeModal}
      />
    );

  return (
    <IonGrid className="dashboard__grid">
      <IonRow className="dashboard__grid__row">
        <IonCol
          className="dashboard__grid__row__col ion-padding-bottom"
          size="6"
        >
          <Link className="link-wrapper" to={COVID_INFO_URL}>
            <IonCard className="card">
              <IonIcon
                className="card-icon info"
                icon={informationCircleOutline}
              />
            </IonCard>
            <IonLabel className="label">COVID-19 Info</IonLabel>
          </Link>
        </IonCol>
        <IonCol
          className="dashboard__grid__row__col ion-padding-bottom"
          size="6"
        >
          <Link className="link-wrapper" to={NEWS_URL}>
            <IonCard className="card">
              <IonIcon className="card-icon news" icon={newspaperOutline} />
            </IonCard>
            <IonLabel className="label">News and Advices</IonLabel>
          </Link>
        </IonCol>
      </IonRow>
      {role === "general" && (
        <GeneralUserFeatures
          userInfo={userInfo}
          setShowHealthCodeModal={setShowHealthCodeModal}
        />
      )}
      {role === "commercial" && <CommercialUserFeatures />}
      {showHealthCodeModal && renderHealthCode()}
    </IonGrid>
  );
};
