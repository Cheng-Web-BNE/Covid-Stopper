import React from "react";
import { IonModal, IonButton } from "@ionic/react";
import QRCode from "qrcode.react";
import { UserInfo } from "../../Home/components/Home";
import "./HealthCode.scss";
import { encryptHealthCode } from "../../../utils/records";

interface HealthCodeProps {
    userInfo: UserInfo;
    setShowHealthCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HealthCode: React.FC<HealthCodeProps> = ({
    userInfo,
    setShowHealthCodeModal,
}) => {
    // const testData = {
    //     user_id: "28",
    //     phone_number: "422429422",
    //     first_name: "Mason",
    //     last_name: "Chen",
    //     email: "travis@gmail.com",
    // };

    const encrypted = encryptHealthCode(JSON.stringify(userInfo));

    return (
        <IonModal
            isOpen={true}
            cssClass="health-code-model"
            animated
            onDidDismiss={() => setShowHealthCodeModal(false)}
        >
            <div className="code-wrapper">
                {/* <QRCode value={JSON.stringify(userInfo)} /> */}
                <QRCode value={encrypted} />
            </div>
            <IonButton onClick={() => setShowHealthCodeModal(false)}>
                Close
            </IonButton>
        </IonModal>
    );
};
