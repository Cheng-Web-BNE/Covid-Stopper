import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
} from "@ionic/react";
import ExploreContainer from "../../../components/ExploreContainer";
import { Link } from "react-router-dom";
import { HOME_URL } from "../../../routes/URLMAP";
import { ellipsisHorizontalOutline } from "ionicons/icons";

const LiveTracing: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <Link to={HOME_URL}>
                            <IonButton>Back</IonButton>
                        </Link>
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton>
                            <IonIcon
                                slot="icon-only"
                                icon={ellipsisHorizontalOutline}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Live Tracing</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Live Tracing</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Live Tracing page" />
            </IonContent>
        </IonPage>
    );
};

export default LiveTracing;
