import React from "react";
import {
    IonContent,
    IonSlides,
    IonSlide,
    IonButton,
    IonIcon,
    IonChip,
    IonAvatar,
    IonLabel,
} from "@ionic/react";
import {
    arrowForwardOutline,
    briefcaseOutline,
    closeCircle,
    glassesOutline,
} from "ionicons/icons";
import socialDistance from "../../../assets/instruction/social-distance.svg";
import howItWorks from "../../../assets/instruction/how-it-works.svg";
import privacy from "../../../assets/instruction/privacy.svg";
import "./InstructionSlides.scss";
import { Link } from "react-router-dom";
import {
    COMMERCIAL_USER_URL,
    GENERAL_USER_URL,
    REGISTRATION_URL,
} from "../../../routes/URLMAP";

interface InstructionSlidesProps {}

const slideOpt = {
    initialSide: 1,
    speed: 400,
};

export const InstructionSlides: React.FC<InstructionSlidesProps> = ({}) => {
    return (
        <IonContent>
            <IonSlides
                className="instruction-slides"
                pager={true}
                options={slideOpt}
            >
                <IonSlide>
                    <div className="slide">
                        <img src={socialDistance} alt="slide1" />
                        <h2>
                            We need you together to help stop the spread of
                            COVID-19
                        </h2>
                        <p>
                            The <b>COVIDStopper</b> has been developed by Dodo
                            Lab to help keep the community safe from the spread
                            of coronavirus.
                        </p>
                        <p>
                            COVIDStopper will securely note contact that you
                            have with other users of the app. If you have been
                            in close contact with someone who has tested
                            positive to the virus, this will allow state and
                            territory health offcials to contact you.
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <img src={howItWorks} alt="slide2" />
                    <h2>How COVIDStopper works</h2>
                    <p>
                        COVIDStopper <b>does not record your location</b>. Our
                        app uses Bluetooth to look for other devices that have
                        the app installed. It takes a note of a contact when it
                        occurs, through a digital handshake.
                    </p>
                    <p>
                        It securely logs the other user's encrypted reference
                        code and the date, time, Bluetooth signal strength and
                        proximity of the contact on the user's phone, and notes
                        the phone model. This information is then securely
                        encryted and stored on the phone.
                    </p>
                </IonSlide>
                <IonSlide>
                    <img src={privacy} alt="slide3" />
                    <h2>Registeration and privacy</h2>
                    <p>
                        It is important that you read the COVIDStopper{" "}
                        <a>privacy policy</a> before you register for
                        COVIDStopper.
                    </p>
                </IonSlide>
                <IonSlide className="instruction-slides__consent-slide">
                    <div>
                        <h2>Registeration consent</h2>
                        <p>
                            I consent to the Digital Transformation Agency as
                            data store adminstrator, under legal determination
                            made by the Dodo Lab collecting: <br />
                            <br />
                            1. My registration information
                            <br />
                            2. Information about my contact with other
                            COVIDStopper users, if another user I have come into
                            contact with tests postive for COVIDStopper and
                            uploads their contact data.
                        </p>
                        <h3>Sign up as:</h3>
                    </div>
                    <Link
                        to={`${REGISTRATION_URL}${GENERAL_USER_URL}`}
                        style={{ textDecoration: "none" }}
                    >
                        <IonChip color="secondary" outline>
                            <IonLabel>General User</IonLabel>
                            <IonIcon icon={glassesOutline} />
                        </IonChip>
                    </Link>
                    <Link
                        to={`${REGISTRATION_URL}${COMMERCIAL_USER_URL}`}
                        style={{ textDecoration: "none" }}
                    >
                        <IonChip color="warning" outline>
                            <IonLabel>Commercial</IonLabel>
                            <IonIcon icon={briefcaseOutline} />
                        </IonChip>
                    </Link>
                </IonSlide>
            </IonSlides>
        </IonContent>
    );
};
