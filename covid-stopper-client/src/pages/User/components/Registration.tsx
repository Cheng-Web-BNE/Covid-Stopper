import React, { useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { UserType } from "../../../api/user";
import { INSTRUCTION_URL } from "../../../routes/URLMAP";
import COMMERCIAL_REGISTRATION_JOURNEY from "../utils/commercialRegistrationJourney copy";
import GENERAL_REGISTRATION_JOURNEY from "../utils/generalRegistrationJourney";
import "./Registration.scss";

interface MatchParams {
    userType: UserType;
}

interface RegistrationProps extends RouteComponentProps<MatchParams> {}

const Registration: React.FC<RegistrationProps> = ({
    match: {
        params: { userType },
    },
}) => {
    const [type, setType] = useState<UserType>();
    const [isLoading, setIsLoading] = useState(true);
    const [currStep, setCurrStep] = useState<number>(0);

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

    const stepHandler = (step: number) => {
        setCurrStep(step);
    };

    if (isLoading) return <div>Loading...</div>;

    let Component;
    switch (type) {
        case "general":
            Component = GENERAL_REGISTRATION_JOURNEY[currStep].component;
            break;
        case "commercial":
            Component = COMMERCIAL_REGISTRATION_JOURNEY[currStep].component;
            break;
        default:
            return <Redirect to={INSTRUCTION_URL} />;
    }

    return <Component currStep={currStep} stepHandler={stepHandler} />;
};

export default Registration;
