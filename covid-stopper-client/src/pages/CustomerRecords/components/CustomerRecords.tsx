import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonTextarea,
} from "@ionic/react";
import {
    callOutline,
    ellipsisHorizontalOutline,
    homeOutline,
    keyOutline,
    mailOutline,
    manOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_URL } from "../../../routes/URLMAP";
import { getRecords, RecordInStores } from "../../../utils/records";
import CancelAlert from "./CancelAlert";
import "./CustomerRecords.scss";
import { CustomerRecord } from "../../../utils/records";
import moment from "moment";

interface CustomerRecordsProps {}

const testData = {
    "10/07/20": [
        {
            userId: "28",
            phone: "422429422",
            name: "Mason",
            email: "Mason@gmail.com",
            address: "Opacity of the button, when focused with, the tab key",
            time: "12:43",
            date: "10/07/20",
        },
        {
            userId: "248",
            phone: "422249422",
            name: "Travis",
            email: "travis@gmail.com",
            address: "Opacity of the button, when focused with, the tab key",
            time: "12:43",
            date: "10/07/20",
        },
        {
            userId: "248",
            phone: "422249422",
            name: "John",
            email: "travis@gmail.com",
            address: "Opacity of the button, when focused with, the tab key",
            time: "12:43",
            date: "10/07/20",
        },
    ],
    "09/10/20": [
        {
            userId: "428",
            phone: "422429422",
            name: "Barbie",
            email: "Barbie@gmail.com",
            address: "Opacity of the button, when focused with, the tab key",
            time: "12:43",
            date: "09/10/20",
        },
        {
            userId: "428",
            phone: "422429422",
            name: "Young",
            email: "Barbie@gmail.com",
            address: "Opacity of the button, when focused with, the tab key",
            time: "12:43",
            date: "09/10/20",
        },
    ],
};

export const CustomerRecords: React.FC<CustomerRecordsProps> = ({}) => {
    const [recordsInStore, setRecordsInStore] = useState<RecordInStores>();
    const [selectedRecord, setSelectedRecord] = useState<CustomerRecord>();
    const [showModal, setShowModal] = useState(false);
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const TODAY = moment().format("MM/DD/YY");

    useEffect(() => {
        (async () => {
            const data = await getRecords();
            setRecordsInStore(data);
            setIsLoading(false);
        })();
    }, []);

    const renderDetailModal = (data: CustomerRecord) => (
        <IonModal
            onDidDismiss={() => setShowModal(false)}
            isOpen={showModal}
            cssClass="customer-detail-modal"
        >
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Details</IonCardTitle>
                </IonCardHeader>
                <IonItem>
                    <IonIcon icon={keyOutline} slot="start" />
                    <IonLabel>{data.userId}</IonLabel>
                </IonItem>
                <IonItem className="ion-activated">
                    <IonIcon icon={manOutline} slot="start" />
                    <IonLabel>{`${data.firstName} ${data.lastName}`}</IonLabel>
                </IonItem>

                <IonItem>
                    <IonIcon icon={callOutline} slot="start" />
                    <IonLabel>{data.phone}</IonLabel>
                </IonItem>

                <IonItem className="ion-activated">
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonLabel>{data.email}</IonLabel>
                </IonItem>

                <IonItem lines="none">
                    <IonIcon icon={homeOutline} slot="start" />
                    <IonTextarea disabled>{data.address}</IonTextarea>
                </IonItem>
                <div className="customer-detail-modal__button-group">
                    <IonButton
                        className="remove"
                        onClick={() => setShowCancelAlert(true)}
                    >
                        Remove
                    </IonButton>
                    <IonButton onClick={() => setShowModal(false)}>
                        Ok
                    </IonButton>
                </div>
            </IonCard>
        </IonModal>
    );

    const sortedByDate = () => {
        if (!recordsInStore) return <div>No resutls yet</div>;

        // recordArrsSortedByDate: [
        //          [10/07/20]: [{...record},{...record}]],
        //          [10/05/20]: [{...record},{...record}]],
        //      ]
        const recordArrsSortedByDate = Object.entries(recordsInStore).reverse(); //TODO testData换records
        return recordArrsSortedByDate.map((recordArr) => {
            const date = recordArr[0];
            const records = recordArr[1];
            return renderRecordLists(records, date);
        });
    };

    const renderRecordLists = (dataArr: CustomerRecord[], date: string) => {
        return (
            <>
                <IonListHeader>{date === TODAY ? "Today" : date}</IonListHeader>
                {dataArr.map((data: CustomerRecord) => (
                    <IonItem
                        button
                        onClick={() => {
                            setShowModal(true);
                            setSelectedRecord(data);
                        }}
                        detail
                    >
                        <IonLabel>{`${data.firstName} ${data.lastName}`}</IonLabel>
                        <IonNote slot="end">{data.time}</IonNote>
                    </IonItem>
                ))}
            </>
        );
    };

    return (
        <IonPage className="customer-records-section">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <Link
                            className="customer-records-section-link"
                            to={HOME_URL}
                        >
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
                    <IonTitle className="ion-text-center">
                        Customer Records
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <IonList>{sortedByDate()}</IonList>
                )}
                {selectedRecord && renderDetailModal(selectedRecord)}
                {showCancelAlert && (
                    <CancelAlert
                        setShowCancelAlert={setShowCancelAlert}
                        setShowModal={setShowModal}
                    />
                )}
            </IonContent>
        </IonPage>
    );
};
