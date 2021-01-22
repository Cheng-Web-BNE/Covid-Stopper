import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonItemDivider,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonProgressBar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../ui/ErrorMessage";
import { getAuth, setAuth } from "../../../utils/auth";
import { listSwabKitAppointments } from "../../../api/tests";
import { SWAB_TEST_URL } from "../../../routes/URLMAP";
import { State } from "ionicons/dist/types/stencil-public-runtime";

interface SwabKitProps {
  currStep: number;
  stepHandler: (step: number) => void;
}
const MySwabTest: React.FC<SwabKitProps> = ({ currStep, stepHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [appointments, setAppointments] = useState([]);

  const Fetch = async () => {
    setError("");

    // send POST
    setIsLoading(true);
    try {
      const token = await getAuth();
      const response = await listSwabKitAppointments(token!);
      setAppointments(response.data);
      stepHandler(currStep + 1);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <IonPage>
        <IonContent>
          {isLoading && (
            <IonProgressBar
              type="indeterminate"
              color="success"
              reversed={true}
            ></IonProgressBar>
          )}
          <IonItemDivider className="ion-padding-top">
            <IonLabel>Your Appointments</IonLabel>
          </IonItemDivider>
          {error && <ErrorMessage error={error} />}
          <IonGrid>
            <IonRow className="registration__sumbit-container">Results</IonRow>
            <IonRow>{appointments}</IonRow>
            <IonRow></IonRow>

            <IonRow className="registration__sumbit-container">
              <IonCol className="ion-text-center ion-padding-top">
                <Link to={SWAB_TEST_URL}>
                  <IonButton color="primary">Back</IonButton>
                </Link>
              </IonCol>
              <IonCol className="ion-text-center ion-padding-top">
                <IonButton color="primary" onClick={Fetch}>
                  Fetch
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
};

export default MySwabTest;
