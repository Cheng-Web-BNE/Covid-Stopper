import React, { useState } from "react";
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
} from "@ionic/react";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { RouteComponentProps, withRouter } from "react-router-dom";
import bluetoothStatic from "../../../assets/bluetooth-static.png";
import bluetoothConnecting from "../../../assets/bluetooth-connecting.gif";
import bluetoothConnected from "../../../assets/bluetooth-connected.gif";
import { HOME_URL } from "../../../routes/URLMAP";

interface BluetoothSettingProps extends RouteComponentProps {}

const BluetoothSetting: React.FC<BluetoothSettingProps> = ({ history }) => {
    const [isBlueToothConnect, setIsBlueToothConnect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEnable = () => {
        setIsLoading(true);

        BluetoothSerial.enable().then(
            (val) => {
                setIsBlueToothConnect(true);
                setIsLoading(false);
            },
            (reason) => {
                setIsBlueToothConnect(true);
                setIsLoading(false);
            }
        );
    };

    const handleNext = () => {
        history.replace(HOME_URL);

        // clear browser history
        // const startPageIndex = history.length - 1;
        // history.go(-startPageIndex);
    };

    const renderBluetoothAnimation = () => {
        if (isLoading) {
            return bluetoothConnecting;
        }
        if (!isBlueToothConnect) {
            return bluetoothStatic;
        } else {
            return bluetoothConnected;
        }
    };

    const renderButton = () => {
        return (
            <IonRow className="registration__sumbit-container">
                {isBlueToothConnect ? (
                    <IonCol
                        className="registration__sumbit-container-col"
                        size="12"
                    >
                        {/* <Link to={HOME_URL}> */}
                        <IonButton
                            className="registration__sumbit-container-button"
                            color="success"
                            onClick={handleNext}
                        >
                            Next
                        </IonButton>
                        {/* </Link> */}
                    </IonCol>
                ) : (
                    <>
                        <IonCol
                            className="registration__sumbit-container-col"
                            size="6"
                        >
                            <IonButton
                                className="registration__sumbit-container-button"
                                color="primary"
                                onClick={handleEnable}
                            >
                                Proceed
                            </IonButton>
                        </IonCol>
                        <IonCol
                            className="registration__sumbit-container-col"
                            size="6"
                        >
                            <IonButton
                                className="registration__sumbit-container-button"
                                color="light"
                                onClick={handleNext}
                            >
                                Do it later
                            </IonButton>
                        </IonCol>
                    </>
                )}
            </IonRow>
        );
    };

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow className="registration__bluetooth-container">
                        <IonCol size="6">
                            <img
                                src={renderBluetoothAnimation()}
                                alt="bluetooth-connecting"
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding">
                        <IonCol>
                            <h2>App setting</h2>
                            <p>
                                Please have your Bluetooth turned on to proceed.
                            </p>
                        </IonCol>
                    </IonRow>
                    {renderButton()}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default withRouter(BluetoothSetting);
