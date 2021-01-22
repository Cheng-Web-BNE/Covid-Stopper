import React, { useEffect, useState } from "react";
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonLabel,
    IonInput,
    IonCol,
    IonButton,
    IonItem,
    IonItemDivider,
    IonProgressBar,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
} from "@ionic/react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import {
    REGISTRATION_URL,
    HOME_URL,
    INSTRUCTION_URL,
} from "../../../routes/URLMAP";
import { memberLogin, UserType } from "../../../api/user";
import { ErrorMessage } from "../ui/ErrorMessage";
import generalValidation from "../utils/generalValidation";
import { setAuth } from "../../../utils/auth";
import commercialValidation from "../utils/commercialValidation";
import { briefcaseOutline, glassesOutline } from "ionicons/icons";
import { Popover } from "../ui/Popover";

interface MatchParams {
    userType: UserType;
}

interface LoginProps extends RouteComponentProps<MatchParams> {}

export const Login: React.FC<LoginProps> = ({
    history,
    match: {
        params: { userType },
    },
}) => {
    // url state
    const [type, setType] = useState<UserType>();
    const [isLoading, setIsLoading] = useState(true);

    // form state
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string>();

    const [showPopover, setShowPopover] = useState<{
        open: boolean;
        event: Event | undefined;
    }>({
        open: false,
        event: undefined,
    });

    useEffect(() => {
        switch (userType) {
            case "commercial":
                setType("commercial");
                break;
            case "general":
                setType("general");
                break;
            default:
                break;
        }
        setIsLoading(false);
    }, []);

    const handleLogin = async () => {
        setError("");

        let payload;
        if (userType === "general") {
            payload = { phone_number: phone, password };
            if (!generalValidation(payload, setError)) return;
        }

        if (userType === "commercial") {
            payload = { name, password };
            if (!commercialValidation(payload, setError)) return;
        }

        if (!payload) return;

        setIsFetching(true);
        try {
            const response = await memberLogin(payload);
            const token = response.data;
            setAuth(token);
            history.replace(HOME_URL);

            // clear browser history
            // const startPageIndex = history.length - 1;
            // history.go(-startPageIndex);
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            }
        }
        setIsFetching(false);
    };

    if (isLoading) return <div>Loading...</div>;

    if (!userType) return <Redirect to={INSTRUCTION_URL} />;

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
                        isLogin={true}
                        userType={userType}
                        popoverOpen={showPopover.open}
                        popoverEvent={showPopover.event}
                        setShowPopover={setShowPopover}
                    />
                    <IonTitle>{`${userType.toUpperCase()} USER`}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {isFetching && (
                    <IonProgressBar
                        type="indeterminate"
                        color="success"
                        reversed={true}
                    ></IonProgressBar>
                )}
                <IonItemDivider className="ion-padding-top">
                    <IonLabel>
                        If you have not yet registered, please{" "}
                        {
                            <Link to={`${REGISTRATION_URL}/${userType}`}>
                                Register
                            </Link>
                        }
                    </IonLabel>
                </IonItemDivider>
                {error && <ErrorMessage error={error} />}
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-padding-bottom">
                            <IonItem>
                                <IonLabel position="floating">
                                    {userType === "general"
                                        ? "Phone number"
                                        : "Name"}
                                </IonLabel>
                                <IonInput
                                    type={
                                        userType === "general"
                                            ? "number"
                                            : "text"
                                    }
                                    value={
                                        userType === "general" ? phone : name
                                    }
                                    onIonChange={(e) =>
                                        userType === "general"
                                            ? setPhone(e.detail.value!)
                                            : setName(e.detail.value!)
                                    }
                                    clearInput
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding-bottom">
                            <IonItem>
                                <IonLabel position="floating">
                                    Password
                                </IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) =>
                                        setPassword(e.detail.value!)
                                    }
                                    clearInput
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="registration__sumbit-container">
                        <IonCol className="ion-text-center ion-padding-top">
                            <IonButton color="primary" onClick={handleLogin}>
                                LOGIN
                                <IonIcon
                                    icon={
                                        userType === "general"
                                            ? glassesOutline
                                            : briefcaseOutline
                                    }
                                    slot="end"
                                />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
