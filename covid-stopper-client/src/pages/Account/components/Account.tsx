import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../../components/ExploreContainer";

const Account: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Account page" />
            </IonContent>
        </IonPage>
    );
};

export default Account;
