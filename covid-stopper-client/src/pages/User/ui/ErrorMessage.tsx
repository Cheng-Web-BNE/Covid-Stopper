import React from "react";
import { IonRow, IonCol, IonCard, IonText, IonCardContent } from "@ionic/react";

interface ErrorMessageProps {
    error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <IonText color="danger">{error}</IonText>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};
