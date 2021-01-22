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
  IonPopover,
  IonSelect,
  IonSegmentButton,
  IonSelectOption,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { TESTING_URL } from "../../../routes/URLMAP";
import { ErrorMessage } from "../ui/ErrorMessage";
import { addClinicTest } from "../../../api/tests";
import { getAuth } from "../../../utils/auth";

interface ClinicTestProps {
  currStep: number;
  stepHandler: (step: number) => void;
}

type ClinicTestForm = "Test Clinic" | "Time" | "Date";

export const ClinicTest: React.FC<ClinicTestProps> = ({
  currStep,
  stepHandler,
}) => {
  const options = ["Brisbane Clinic", "Upper Mount Gravatt Clinic"];
  // const [clinicId, setClinicId] = useState("");
  var clinicId = "";
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [confirmPopover, setConfirmPopover] = useState(false);

  const renderInput = (
    label: ClinicTestForm,
    type: any,
    data: string,
    dataHandler: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (
      <IonRow>
        <IonCol className="ion-padding-bottom">
          <IonItem>
            <IonLabel position="stacked">{label}</IonLabel>
            <IonInput
              type={type}
              required
              value={data}
              clearInput
              onIonChange={(e) => dataHandler(e.detail.value!)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
    );
  };

  const handleSubmit = async () => {
    if (selectedClinic === "Brisbane Clinic") {
      clinicId = "1";
    } else if (selectedClinic === "Upper Mount Gravatt Clinic") {
      clinicId = "2";
    }

    setError("");

    const formData = {
      token: await getAuth(),
      test_clinic_id: parseInt(clinicId),
      time: time,
      date: date,
    };

    // send POST
    setIsLoading(true);
    try {
      const response = await addClinicTest(formData);
      stepHandler(currStep + 1);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
    setIsLoading(false);
  };
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
          <IonLabel>Book a clinic test</IonLabel>
        </IonItemDivider>
        {error && <ErrorMessage error={error} />}
        <IonGrid>
          <IonRow>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="stacked">Test Clinic</IonLabel>
                <IonSelect
                  value={selectedClinic}
                  placeholder="Select Test Centre"
                  onIonChange={(e) => setSelectedClinic(e.detail.value)}
                >
                  {options.map((option) => (
                    <IonSelectOption value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          {renderInput("Time", "time", time, setTime)}
          {renderInput("Date", "date", date, setDate)}

          <IonPopover
            isOpen={confirmPopover}
            cssClass="my-custom-class"
            onDidDismiss={(e) => setConfirmPopover(false)}
          >
            <p>
              Booking confirmed, further instruction will be sent to your email
              address shortly.
            </p>
          </IonPopover>

          <IonRow className="registration__sumbit-container">
            <IonCol className="ion-text-center ion-padding-top">
              <Link to={TESTING_URL}>
                <IonButton color="primary">Back</IonButton>
              </Link>
            </IonCol>
            <IonCol className="ion-text-center ion-padding-top">
              <IonButton
                color="primary"
                onClick={() => {
                  setConfirmPopover(true);
                  handleSubmit();
                }}
              >
                Confirm Booking
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ClinicTest;
