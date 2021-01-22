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
} from "@ionic/react";
import { Link } from "react-router-dom";
import { PERSONAL_INFO_URL, TESTING_URL } from "../../../routes/URLMAP";
import { generalMemberUpdate, generalMemberRead } from "../../../api/user";
import { getAuth } from "../../../utils/auth";

interface UpdateInfoProps {
  currStep: number;
  stepHandler: (step: number) => void;
}

type UpdateInfoForm =
  | "Phone Number"
  | "Email Address"
  | "Street Address"
  | "Suburb"
  | "Postcode"
  | "New Password";

export const UpdateInfo: React.FC<UpdateInfoProps> = ({
  currStep,
  stepHandler,
}) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [confirmPopover, setConfirmPopover] = useState(false);

  const renderInput = (
    label: UpdateInfoForm,
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
    setError("");
    const formData = {
      token: await getAuth(),
      phone_number: phone,
      email: email,
      street_address: streetAddress,
      street_suburb: suburb,
      street_post_code: postcode,
      password: password,
    };
    // send POST
    setIsLoading(true);
    try {
      const response = await generalMemberUpdate(formData);
      stepHandler(currStep + 1);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
    setIsLoading(false);
  };

  const handleRead = async () => {
    setError("");
    const formDataRead = {
      token: await getAuth(),
    };
    // send POST

    try {
      const response = await generalMemberRead(formDataRead);
      setPhone(response.data.phone_number);
      setEmail(response.data.email);
      setStreetAddress(response.data.street_address);
      setSuburb(response.data.street_suburb);
      setPostcode(response.data.street_post_code);
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
      <IonContent>
        {isLoading && (
          <IonProgressBar
            type="indeterminate"
            color="success"
            reversed={true}
          ></IonProgressBar>
        )}
        <IonItemDivider className="ion-padding-top">
          <IonLabel>Update Personal Information</IonLabel>
        </IonItemDivider>
        <IonGrid>
          {renderInput("Phone Number", "phone", phone, setPhone)}
          {renderInput("Email Address", "email", email, setEmail)}
          {renderInput(
            "Street Address",
            "address",
            streetAddress,
            setStreetAddress
          )}
          {renderInput("Suburb", "suburb", suburb, setSuburb)}
          {renderInput("Postcode", "postcode", postcode, setPostcode)}
          {renderInput("New Password", "password", password, setPassword)}
          <IonPopover
            isOpen={confirmPopover}
            cssClass="my-custom-class"
            onDidDismiss={(e) => setConfirmPopover(false)}
          >
            <p>Update successful!</p>
          </IonPopover>

          <IonRow className="registration__sumbit-container">
            <IonCol className="ion-text-center ion-padding-top">
              <Link to={PERSONAL_INFO_URL}>
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
                Update
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default UpdateInfo;
