import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonList,
  IonItem,
  IonButtons,
  IonIcon,
  IonPopover,
} from "@ionic/react";
import "./SelfCheck.scss";
import { arrowForwardOutline, ellipsisHorizontalOutline } from "ionicons/icons";
import { HOME_URL } from "../../../routes/URLMAP";

const SelfCheck: React.FC = () => {
  const [coughChecked, setCoughChecked] = useState(false);
  const [feverChecked, setFeverChecked] = useState(false);
  const [breathChecked, setBreathChecked] = useState(false);
  const [fatigueChecked, setFatigueChecked] = useState(false);
  const [muscleChecked, setMuscleChecked] = useState(false);
  const [headacheChecked, setHeadacheChecked] = useState(false);
  const [lossChecked, setLossChecked] = useState(false);
  const [soreChecked, setSoreChecked] = useState(false);
  const [noseChecked, setNoseChecked] = useState(false);

  const [safePopover, setSafePopover] = useState(false);
  const [unsafePopover, setUnsafePopover] = useState(false);

  let count = 0;

  let checkedList = [
    feverChecked,
    coughChecked,
    breathChecked,
    fatigueChecked,
    muscleChecked,
    headacheChecked,
    lossChecked,
    soreChecked,
    noseChecked,
  ];
  for (let i of checkedList) {
    if (i) {
      count = count + 1;
    }
  }
  return (
    <IonPage>
      <div className="ion-page self-check" id="main-content">
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
            <IonTitle className="ion-text-center">Symptom Checker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Cough</IonLabel>
              <IonCheckbox
                onIonChange={(e) => setCoughChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Fever or Chill</IonLabel>
              <IonCheckbox
                onIonChange={(e) => setFeverChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Shortness of breath</IonLabel>
              <IonCheckbox
                onIonChange={(e) => setBreathChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Fatigue</IonLabel>
              <IonCheckbox
                onIonChange={(e) => setFatigueChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Muscle or Body Pain </IonLabel>
              <IonCheckbox
                onIonChange={(e) => setMuscleChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Headache </IonLabel>
              <IonCheckbox
                onIonChange={(e) => setHeadacheChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Loss of Taste or Smell </IonLabel>
              <IonCheckbox
                onIonChange={(e) => setLossChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Sore Throat</IonLabel>
              <IonCheckbox
                onIonChange={(e) => setSoreChecked(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel> Congestion or Runny Nose </IonLabel>
              <IonCheckbox
                onIonChange={(e) => setNoseChecked(e.detail.checked)}
              />
            </IonItem>
          </IonList>
        </IonContent>

        <>
          <IonPopover
            isOpen={safePopover}
            cssClass="my-custom-class"
            onDidDismiss={(e) => setSafePopover(false)}
          >
            <p>
              Please have some rest first and retake the test after two days.
            </p>
          </IonPopover>
          <IonPopover
            isOpen={unsafePopover}
            cssClass="my-custom-class"
            onDidDismiss={(e) => setUnsafePopover(false)}
          >
            <p>Please book a COVID test immediately.</p>
          </IonPopover>
          <IonButton
            onClick={() => {
              if (count < 2) {
                setSafePopover(true);
              } else {
                setUnsafePopover(true);
              }
            }}
          >
            Submit
            <IonIcon slot="end" icon={arrowForwardOutline}></IonIcon>
          </IonButton>
        </>
      </div>
    </IonPage>
  );
};

export default SelfCheck;
