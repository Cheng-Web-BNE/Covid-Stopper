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
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
    COMMERCIAL_USER_URL,
    INSTRUCTION_URL,
    LOGIN_URL,
} from "../../../routes/URLMAP";
import commercialValidation from "../utils/commercialValidation";
import { ErrorMessage } from "../ui/ErrorMessage";
import { commercialMemberRegister } from "../../../api/user";
import { setAuth } from "../../../utils/auth";
import { briefcaseOutline } from "ionicons/icons";
import { Popover } from "../ui/Popover";

interface CommercialInfoProps {
    currStep: number;
    stepHandler: (step: number) => void;
}

type RegisterForm =
    | "Name"
    | "Phone number"
    | "Email address"
    | "Password"
    | "Repeat Password";

export const CommercialInfo: React.FC<CommercialInfoProps> = ({
    currStep,
    stepHandler,
}) => {
    const [Name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const [showPopover, setShowPopover] = useState<{
        open: boolean;
        event: Event | undefined;
    }>({
        open: false,
        event: undefined,
    });

    const renderInput = (
        label: RegisterForm,
        type: any,
        data: string,
        dataHandler: React.Dispatch<React.SetStateAction<string>>
    ) => {
        return (
            <IonRow>
                <IonCol className="ion-padding-bottom">
                    <IonItem>
                        <IonLabel position="stacked">{label}</IonLabel>
                        <IonInput
                            type={type}
                            required
                            value={data}
                            clearInput
                            onIonChange={(e) => dataHandler(e.detail.value!)}
                        />
                    </IonItem>
                </IonCol>
            </IonRow>
        );
    };

    const handleSubmit = async () => {
        setError("");
        const formData = {
            name: Name,
            password: password,
            repeat_password: repeatPwd,
            phone_number: phone,
            email,
        };
        if (!commercialValidation(formData, setError)) return;

        // send POST
        setIsLoading(true);
        delete formData.repeat_password;
        try {
            const response = await commercialMemberRegister(formData);
            const token = response.data;
            setAuth(token);
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
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <Link to={INSTRUCTION_URL}>
                            <IonBackButton disabled defaultHref="/" />
                        </Link>
                    </IonButtons>
                    <Popover
                        isLogin={false}
                        userType={"commercial"}
                        popoverOpen={showPopover.open}
                        popoverEvent={showPopover.event}
                        setShowPopover={setShowPopover}
                    />
                    <IonTitle>COMMERCIAL USER</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                        If you are already have an account, please{" "}
                        {
                            <Link to={`${LOGIN_URL}${COMMERCIAL_USER_URL}`}>
                                Login
                            </Link>
                        }
                    </IonLabel>
                </IonItemDivider>
                {error && <ErrorMessage error={error} />}
                <IonGrid>
                    {renderInput("Name", "text", Name, setName)}
                    {renderInput("Password", "password", password, setPassword)}
                    {renderInput(
                        "Repeat Password",
                        "password",
                        repeatPwd,
                        setRepeatPwd
                    )}
                    {renderInput("Phone number", "number", phone, setPhone)}
                    {renderInput("Email address", "text", email, setEmail)}
                    <IonRow className="registration__sumbit-container">
                        <IonCol className="ion-text-center ion-padding-top">
                            <IonButton color="primary" onClick={handleSubmit}>
                                Register
                                <IonIcon icon={briefcaseOutline} slot="end" />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
