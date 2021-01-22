import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonButton,
} from "@ionic/react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  HOME_URL,
  PERSONAL_INFO_URL,
  COMMERCIAL_USER_URL,
  GENERAL_USER_URL,
  LOGIN_URL,
} from "../../../routes/URLMAP";
import { getRole, removeAuthAndRole } from "../../../utils/auth";
import { removeBleInStorage } from "../../../utils/bluetooth";

interface SideMenuProps extends RouteComponentProps {}

const SideMenu: React.FC<SideMenuProps> = ({ history }) => {
  const handleLogout = async () => {
    const role = await getRole();

    await removeAuthAndRole();
    await removeBleInStorage();
    history.replace(
      `${LOGIN_URL}${
        role === "general" ? GENERAL_USER_URL : COMMERCIAL_USER_URL
      }`
    );
  };

  return (
    <IonMenu side="start" content-id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <Link to={HOME_URL}>
              <IonButton fill="clear">Home</IonButton>
            </Link>
          </IonItem>
          <IonItem>
            <Link to={PERSONAL_INFO_URL}>
              <IonButton fill="clear">Personal Information</IonButton>
            </Link>
          </IonItem>
          <IonItem>
            <IonButton onClick={handleLogout} fill="clear">
              Logout
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(SideMenu);
