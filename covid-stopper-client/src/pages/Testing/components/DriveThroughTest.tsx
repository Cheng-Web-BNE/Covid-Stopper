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
    IonSelectOption,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { TESTING_URL } from "../../../routes/URLMAP";
import { ErrorMessage } from "../ui/ErrorMessage";
import { addDriveTest } from "../../../api/tests";
import { getAuth } from "../../../utils/auth";

interface ClinicTestProps {
    currStep: number;
    stepHandler: (step: number) => void;
}

type ClinicTestForm =
    | "Drive Through Test Centre";

export const DriveTest: React.FC<ClinicTestProps> = ({
    currStep,
    stepHandler,
}) => {
    const [centreId, setClinicId] = useState("");
    const options = ["Drive Through Test Centre Brisbane"];
    var testCentreId = "";
    const [selectedCentre, setSelectedCentre] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const [confirmPopover, setConfirmPopover] = useState(false);


    

    const handleSubmit = async () => {
        if(selectedCentre === "Drive Through Test Centre Brisbane"){
            testCentreId = "1";
        }
        setError("");
        const formData = {
            token: await getAuth(),
            test_drive_through_id: parseInt(testCentreId),
        };

        // send POST
        setIsLoading(true);
        try {
            const response = await addDriveTest(formData);
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
                    <IonLabel>
                        Book a drive through test
                    </IonLabel>
                </IonItemDivider>
                {error && <ErrorMessage error={error} />}
                <IonGrid>
                <IonRow>
                    <IonCol className="ion-padding-bottom">
                        <IonItem>
                            <IonLabel position="stacked">Test Clinic</IonLabel>
                            <IonSelect
                            value={selectedCentre}
                            placeholder="Select Test Centre"
                            onIonChange={(e) => setSelectedCentre(e.detail.value)}
                            >
                                {options.map((option) => (
                                    <IonSelectOption value={option}>{option}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                </IonRow>

                    <IonPopover
                        isOpen={confirmPopover}
                        cssClass='my-custom-class'
                        onDidDismiss={e => setConfirmPopover(false)}
                    >
                        <p>
                            Booking confirmed, further instruction
                            will be sent to your email address shortly.
                        </p>
                    </IonPopover>
                    
                    <IonRow className="registration__sumbit-container">
                        <IonCol className="ion-text-center ion-padding-top">
                            <Link to={TESTING_URL}>
                                <IonButton color="primary">
                                    Back
                                </IonButton>
                            </Link>
                        </IonCol>
                        <IonCol className="ion-text-center ion-padding-top">
                            <IonButton color="primary" onClick={()=>{
                                    setConfirmPopover(true);
                                    handleSubmit();
                                    }}>
                                Confirm Booking
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
export default DriveTest;