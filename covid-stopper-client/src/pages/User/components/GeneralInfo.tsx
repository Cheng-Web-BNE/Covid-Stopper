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
    GENERAL_USER_URL,
    INSTRUCTION_URL,
    LOGIN_URL,
} from "../../../routes/URLMAP";
import generalValidation from "../utils/generalValidation";
import { ErrorMessage } from "../ui/ErrorMessage";
import { generalMemberRegister } from "../../../api/user";
import { setAuth } from "../../../utils/auth";
import { glassesOutline } from "ionicons/icons";
import { Popover } from "../ui/Popover";

interface GeneralInfoProps {
    currStep: number;
    stepHandler: (step: number) => void;
}

type RegisterForm =
    | "Phone number"
    | "Email address"
    | "Password"
    | "Repeat Password"
    | "First Name"
    | "Last Name";

export const GeneralInfo: React.FC<GeneralInfoProps> = ({
    currStep,
    stepHandler,
}) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
            phone_number: phone,
            password: password,
            repeat_password: repeatPwd,
            first_name: firstName,
            last_name: lastName,
            email,
        };
        if (!generalValidation(formData, setError)) return;

        // send POST
        setIsLoading(true);
        delete formData.repeat_password;
        try {
            const response = await generalMemberRegister(formData);
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
                        userType={"general"}
                        popoverOpen={showPopover.open}
                        popoverEvent={showPopover.event}
                        setShowPopover={setShowPopover}
                    />
                    <IonTitle>GENERAL USER</IonTitle>
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
                            <Link to={`${LOGIN_URL}${GENERAL_USER_URL}`}>
                                Login
                            </Link>
                        }
                    </IonLabel>
                </IonItemDivider>
                {error && <ErrorMessage error={error} />}
                <IonGrid>
                    {renderInput("Phone number", "number", phone, setPhone)}
                    {renderInput("Password", "password", password, setPassword)}
                    {renderInput(
                        "Repeat Password",
                        "password",
                        repeatPwd,
                        setRepeatPwd
                    )}
                    {renderInput("First Name", "text", firstName, setFirstName)}
                    {renderInput("Last Name", "text", lastName, setLastName)}
                    {renderInput("Email address", "text", email, setEmail)}
                    <IonRow className="registration__sumbit-container">
                        <IonCol className="ion-text-center ion-padding-top">
                            <IonButton color="primary" onClick={handleSubmit}>
                                Register
                                <IonIcon icon={glassesOutline} slot="end" />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
