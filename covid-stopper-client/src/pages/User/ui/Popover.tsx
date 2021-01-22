import {
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonPopover,
} from "@ionic/react";
import { chevronForwardOutline, swapHorizontalOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import {
    COMMERCIAL_USER_URL,
    GENERAL_USER_URL,
    LOGIN_URL,
    REGISTRATION_URL,
} from "../../../routes/URLMAP";

interface PopoverProps {
    isLogin: boolean;
    userType: string;
    popoverOpen: boolean;
    popoverEvent: Event | undefined;
    setShowPopover: React.Dispatch<
        React.SetStateAction<{
            open: boolean;
            event: Event | undefined;
        }>
    >;
}

export const Popover: React.FC<PopoverProps> = ({
    isLogin,
    userType,
    popoverOpen,
    popoverEvent,
    setShowPopover,
}) => {
    return (
        <IonButtons slot="end">
            <IonPopover
                isOpen={popoverOpen}
                event={popoverEvent}
                cssClass="switch-user-popover"
                onDidDismiss={(e) =>
                    setShowPopover({
                        open: false,
                        event: undefined,
                    })
                }
            >
                <Link
                    to={`${isLogin ? REGISTRATION_URL : LOGIN_URL}${
                        userType === "general"
                            ? COMMERCIAL_USER_URL
                            : GENERAL_USER_URL
                    }`}
                    style={{ textDecoration: "none" }}
                >
                    <IonItem>
                        <IonLabel>
                            Switch to{" "}
                            {userType === "general" ? "Commercial" : "General"}
                        </IonLabel>
                        <IonIcon icon={chevronForwardOutline} slot="end" />
                    </IonItem>
                </Link>
            </IonPopover>
            <IonButton
                onClick={(e) =>
                    setShowPopover({
                        open: true,
                        event: e.nativeEvent,
                    })
                }
            >
                <IonIcon
                    slot="icon-only"
                    ios={swapHorizontalOutline}
                    md={swapHorizontalOutline}
                />
            </IonButton>
        </IonButtons>
    );
};
