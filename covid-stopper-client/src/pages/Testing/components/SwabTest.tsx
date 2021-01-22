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
import { MY_SWABTEST_URL, TESTING_URL } from "../../../routes/URLMAP";
import { ErrorMessage } from "../ui/ErrorMessage";
import { addSwabKitTest } from "../../../api/tests";
import { getAuth } from "../../../utils/auth";

interface SwabTestProps {
    currStep: number;
    stepHandler: (step: number) => void;
}


export const SwabTest: React.FC<SwabTestProps> = ({
    currStep,
    stepHandler,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [confirmPopover, setConfirmPopover] = useState(false);
    const [gender, setGender] = useState<string>("");



    const handleSubmit = async () => {
        setError("");
        const formData = {
            token: await getAuth(),
        };

        // send POST
        setIsLoading(true);
        try {
            const response = await addSwabKitTest(formData);
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
                        Request a swab kid mailed to your address?
                    </IonLabel>
                </IonItemDivider>
                {error && <ErrorMessage error={error} />}
                <IonGrid>
                    <IonRow className="registration__sumbit-container">
                        <IonCol className="ion-text-center ion-padding-top">
                            
                        </IonCol>
                    </IonRow>
                    <IonPopover
                        isOpen={confirmPopover}
                        cssClass='my-custom-class'
                        onDidDismiss={e => setConfirmPopover(false)}
                    >
                        <p>
                            Request confirmed, further instruction and tracking number
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
                                Confirm Request
                            </IonButton>
                        </IonCol>

                        
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
export default SwabTest;