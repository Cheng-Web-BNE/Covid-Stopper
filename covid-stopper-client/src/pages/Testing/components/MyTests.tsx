import React, { useEffect, useState } from "react";
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
  IonSelectOption,
} from "@ionic/react";
import { Link, RouteComponentProps } from "react-router-dom";
import { PERSONAL_INFO_URL, TESTING_URL } from "../../../routes/URLMAP";
import { getAuth } from "../../../utils/auth";
import {
  listClinicAppointments,
  listClinicInfo,
  listDriveThroughInfo,
  listDriveThroughAppointments,
  listSwabKitRequests,
} from "../../../api/tests";

interface UpdateInfoProps extends RouteComponentProps {}

type UpdateInfoForm =
  | "Date"
  | "Time"
  | "Test Clinic"
  | "Result"
  | "Drive Through Test Centre"
  | "Tracking Number";

export const MyTests: React.FC<UpdateInfoProps> = ({ history }) => {
  const [date, setDate] = useState([]);
  const [selectionArray, setSelectionArray] = useState<any>([]);

  const [time, setTime] = useState("");
  const [clinic, setClinic] = useState("");
  const [driveThroughCentre, setDriveThroughCentre] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState("");
  const [clinicResult, setClinicResult] = useState("");
  const [driveThroughResult, setDriveThroughResult] = useState("");
  const [swabKitResult, setSwabKitResult] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [confirmPopover, setConfirmPopover] = useState(false);
  const selectionDates: any[] = [];
  const [testType, setTestType] = useState("");
  const options = ["Clinic Test", "Drive Through Test", "Swab Kit Test"];

  const renderRead = (label: UpdateInfoForm, type: any, data: string) => {
    return (
      <IonRow>
        <IonCol className="ion-padding-bottom">
          <IonItem>
            <IonLabel position="stacked">{label}</IonLabel>
            <IonInput type={type} required value={data} clearInput />
          </IonItem>
        </IonCol>
      </IonRow>
    );
  };

  const handleInitialDates = async () => {
    setError("");
    const formDataRead = {
      token: await getAuth(),
    };
    try {
      const response = await listClinicAppointments(formDataRead);
      for (const appointment of response.data) {
        selectionDates.push(appointment.date.toLocaleString());
      }

      setSelectionArray(selectionDates);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
  };

  const handleRead = async () => {
    setError("");
    const formDataRead = {
      token: await getAuth(),
    };
    const formDataListClinics = {};
    try {
      if (testType === "Clinic Test") {
        const response = await listClinicAppointments(formDataRead);
        const clinicInfo = await listClinicInfo(formDataListClinics);
        for (const appointment of response.data) {
          if (appointment.date === date) {
            setTime(appointment.time);
            setClinicResult(appointment.result);
            for (const clinicName of clinicInfo.data) {
              if (clinicName.id === appointment.test_clinic_id) {
                setClinic(clinicName.name);
              }
            }
          }
        }
        if (clinicResult === "") {
          setClinicResult("pending");
        }
      } else if (testType === "Drive Through Test") {
        const response = await listDriveThroughAppointments(formDataRead);
        const driveThroughInfo = await listDriveThroughInfo(
          formDataListClinics
        );
        for (const appointment of response.data) {
          setDriveThroughResult(appointment.result);
          for (const driveThrough of driveThroughInfo.data) {
            if (driveThrough.id === appointment.test_drive_through_id) {
              setDriveThroughCentre(driveThrough.name);
            }
          }
        }
        if (driveThroughResult === "") {
          setDriveThroughResult("pending");
        }
      } else {
        const response = await listSwabKitRequests(formDataRead);
        for (const appointment of response.data) {
          setSwabKitResult(appointment.result);
          if (appointment.send_tracking_number === null) {
            setTrackingNumber("TBD");
          }
          setTrackingNumber("To be Generated");
        }
        if (swabKitResult === "") {
          setSwabKitResult("pending");
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await handleInitialDates();
      //   await handleRead();
      setIsLoading(false);
    })();
  }, []);

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
        <IonGrid>
          <IonRow>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="stacked">Test Type</IonLabel>
                <IonSelect
                  value={testType}
                  placeholder="Select Test Type"
                  onIonChange={(e) => setTestType(e.detail.value)}
                >
                  {options.map((option) => (
                    <IonSelectOption value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          {testType === "Clinic Test" && (
            <IonRow>
              <IonCol className="ion-padding-bottom">
                <IonItem>
                  <IonLabel position="stacked">Date</IonLabel>
                  {!isLoading && (
                    <IonSelect
                      value={date}
                      placeholder="Select Date"
                      onIonChange={(e) => setDate(e.detail.value)}
                    >
                      {selectionArray.map((option: any) => (
                        <IonSelectOption value={option}>
                          {option}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>
          )}
          {testType === "Clinic Test" && renderRead("Time", "string", time)}
          {testType === "Clinic Test" &&
            renderRead("Test Clinic", "clinic", clinic)}
          {testType === "Clinic Test" &&
            renderRead("Result", "result", clinicResult)}
          {testType === "Drive Through Test" &&
            renderRead(
              "Drive Through Test Centre",
              "string",
              driveThroughCentre
            )}
          {testType === "Drive Through Test" &&
            renderRead("Result", "result", driveThroughResult)}
          {testType === "Swab Kit Test" &&
            renderRead("Tracking Number", "string", trackingNumber)}
          {testType === "Swab Kit Test" &&
            renderRead("Result", "result", swabKitResult)}

          <IonPopover
            isOpen={confirmPopover}
            cssClass="my-custom-class"
            onDidDismiss={(e) => setConfirmPopover(false)}
          >
            <p>Invalid Date, please enter again.</p>
          </IonPopover>

          <IonRow className="registration__sumbit-container">
            <IonCol className="ion-text-center ion-padding-top">
              {/* <Link to={TESTING_URL}> */}
              <IonButton color="primary" onClick={() => history.goBack()}>
                Back
              </IonButton>
              {/* </Link> */}
            </IonCol>
            <IonCol className="ion-text-center ion-padding-top">
              <IonButton color="primary" onClick={handleRead}>
                Get Test Info
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default MyTests;
