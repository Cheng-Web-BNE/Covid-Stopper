import {
  IonCard,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonToast,
} from "@ionic/react";
import { fileTrayFullOutline, scanCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CUSTOMER_RECORD_URL } from "../../../routes/URLMAP";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { decryptHealthCode, storeRecords } from "../../../utils/records";

interface CommercialUserFeaturesProps {}

export const CommercialUserFeatures: React.FC<CommercialUserFeaturesProps> = ({}) => {
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<any>();

  const handleScanner = async () => {
    setError("");
    try {
      const {
        text: encryptedUserInfo,
        format,
        cancelled,
      } = await BarcodeScanner.scan();

      // scan cancel
      if (cancelled) throw new Error("Scan cancelled");

      // qrcode format validation
      if (format !== "QR_CODE" || !encryptedUserInfo)
        throw new Error("HealthCode is not valid");

      const decrypted = decryptHealthCode(encryptedUserInfo); // output: userInfo in JSON
      const data = JSON.parse(decrypted);
      if (!data.userId || !data.phone || !data.email)
        throw new Error("Customer information is not valid");

      await storeRecords(data);
      setShowToast(true);
    } catch (error) {
      setError(error);
      setShowToast(true);
    }
  };

  return (
    <>
      <IonRow className="dashboard__grid__row">
        <IonCol
          className="dashboard__grid__row__col ion-padding-bottom"
          size="6"
        >
          <div className="link-wrapper">
            <IonCard button onClick={handleScanner} className="card">
              <IonItem lines="none">
                <IonIcon
                  className="card-icon scanner"
                  icon={scanCircleOutline}
                />
              </IonItem>
            </IonCard>
            <IonLabel className="label">HealthCode Scanner</IonLabel>
          </div>
        </IonCol>
        <IonCol
          className="dashboard__grid__row__col ion-padding-bottom"
          size="6"
        >
          <Link className="link-wrapper" to={CUSTOMER_RECORD_URL}>
            <IonCard className="card">
              <IonIcon className="card-icon flask" icon={fileTrayFullOutline} />
            </IonCard>
            <IonLabel className="label">Customer Records</IonLabel>
          </Link>
        </IonCol>
      </IonRow>
      <IonToast
        isOpen={showToast}
        color={error && "danger"}
        onDidDismiss={() => setShowToast(false)}
        message={error ? error : "Customer information have been saved"}
        duration={2500}
      />
    </>
  );
};
