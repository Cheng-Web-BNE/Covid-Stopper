import React, { useRef, useState } from "react";
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonButton,
} from "@ionic/react";
import "./Verification.scss";

interface VerificationProps {
    currStep: number;
    stepHandler: (step: number) => void;
}

export const Verification: React.FC<VerificationProps> = ({
    currStep,
    stepHandler,
}) => {
    const [form, setForm] = useState({
        firstPin: "",
        secondPin: "",
        thirdPin: "",
        fourthPin: "",
    });
    const firstPinRef = useRef<HTMLInputElement>(null);
    const secondPinRef = useRef<HTMLInputElement>(null);
    const thirdPinRef = useRef<HTMLInputElement>(null);
    const fourthPinRef = useRef<HTMLInputElement>(null);

    async function foucsElement(ref: HTMLInputElement) {
        await ref.focus();
    }

    async function loseFocus(ref: HTMLInputElement) {
        await ref.blur();
    }

    const switchFocus = (key: string, way: string) => {
        switch (key) {
            case "firstPin":
                way === "forward" && foucsElement(secondPinRef.current!);
                break;
            case "secondPin":
                way === "forward"
                    ? foucsElement(thirdPinRef.current!)
                    : foucsElement(firstPinRef.current!);
                break;
            case "thirdPin":
                way === "forward"
                    ? foucsElement(fourthPinRef.current!)
                    : foucsElement(secondPinRef.current!);
                break;
            case "fourthPin":
                way === "forward"
                    ? loseFocus(fourthPinRef.current!)
                    : foucsElement(thirdPinRef.current!);
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const val = e.target.value;
        if (val.length > 1) return; // maxLength: 1
        setForm({ ...form, [key]: val });
        val && switchFocus(key, "forward");
    };

    const handleDelete = (e: any) => {
        const key = e.target.name;
        const val = e.target.value;
        if (val) {
            setForm({ ...form, [key]: "" });
            return;
        }
        if (e.key === "Backspace") {
            switchFocus(key, "backward");
        }
    };

    const handleBack = () => {
        stepHandler(currStep - 1);
    };

    const handleVerify = () => {
        stepHandler(currStep + 1);
    };

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <IonText>
                                <h1>
                                    Please enter the 4-digit code that has just
                                    sent to your email
                                </h1>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <div className="verification__pin">
                        <div className="verification__pin-container">
                            <input
                                type="text"
                                className="verification__pin-input"
                                ref={firstPinRef}
                                name="firstPin"
                                value={form.firstPin}
                                onChange={handleInputChange}
                                onKeyDown={handleDelete}
                            />
                            <input
                                type="text"
                                className="verification__pin-input"
                                ref={secondPinRef}
                                name="secondPin"
                                value={form.secondPin}
                                onChange={handleInputChange}
                                onKeyDown={handleDelete}
                            />
                            <input
                                type="text"
                                className="verification__pin-input"
                                ref={thirdPinRef}
                                name="thirdPin"
                                value={form.thirdPin}
                                onChange={handleInputChange}
                                onKeyDown={handleDelete}
                            />
                            <input
                                type="text"
                                className="verification__pin-input"
                                ref={fourthPinRef}
                                name="fourthPin"
                                value={form.fourthPin}
                                onChange={handleInputChange}
                                onKeyDown={handleDelete}
                            />
                        </div>
                    </div>
                    <IonRow className="registration__sumbit-container">
                        <IonCol
                            className="registration__sumbit-container-col"
                            size="6"
                        >
                            <IonButton
                                className="registration__sumbit-container-button"
                                color="light"
                                onClick={handleBack}
                            >
                                Back
                            </IonButton>
                        </IonCol>
                        <IonCol
                            className="registration__sumbit-container-col"
                            size="6"
                        >
                            <IonButton
                                className="registration__sumbit-container-button"
                                color="primary"
                                onClick={handleVerify}
                            >
                                Verify
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
