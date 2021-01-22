import React from "react";
import { IonAlert } from "@ionic/react";

interface CancelAlertProps {
    setShowCancelAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CancelAlert: React.FC<CancelAlertProps> = ({
    setShowCancelAlert,
    setShowModal,
}) => {
    return (
        <>
            <IonAlert
                isOpen={true}
                onDidDismiss={() => setShowCancelAlert(false)}
                message={"Are you sure to <strong>remove</strong> this record?"}
                buttons={[
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                    },
                    {
                        text: "Okay",
                        handler: () => {
                            setShowModal(false);
                        },
                    },
                ]}
            />
        </>
    );
};

export default CancelAlert;
