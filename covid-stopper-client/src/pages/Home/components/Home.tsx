import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonAlert,
  IonLabel,
} from "@ionic/react";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { DashboardCards } from "./DashboardCards";
import { mailOpen } from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import { getAuth, getRole } from "../../../utils/auth";
import { getMemberInfo } from "../../../api/user";
import "./Home.scss";
import { getBleInStorage, setBleInStorage } from "../../../utils/bluetooth";
import SideMenu from "./SideMenu";

export interface UserInfo {
  userId: number | string;
  phone: number | string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  address?: string;
}

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [role, setRole] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);

  // bluetooth state
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBluetoothEnable, setIsBluetoothEnable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const checkIsBleEnable = async () => {
    setIsConnecting(true);
    try {
      await BluetoothSerial.isEnabled();
      setIsBluetoothEnable(true);
    } catch (error) {
      setIsBluetoothEnable(false);
    }
    setIsConnecting(false);
  };

  const handleBleEnable = () => {
    setIsConnecting(true);
    BluetoothSerial.enable().then(
      (val) => {
        setIsBluetoothEnable(true);
        setIsConnecting(false);
      },
      (reason) => {
        setIsBluetoothEnable(false);
        setIsConnecting(false);
      }
    );
  };

  useEffect(() => {
    (async () => {
      // bluetooth
      const hasBleChecked = await getBleInStorage();
      if (!hasBleChecked) {
        // first time log in
        handleBleEnable();
        await setBleInStorage("true");
      } else {
        await checkIsBleEnable();
      }

      // fetch userInfo
      try {
        const role = await getRole();
        setRole(role);
        const token = await getAuth();
        const { data } = await getMemberInfo(token!);
        const {
          user_id,
          id,
          phone_number,
          name,
          first_name,
          last_name,
          email,
          street_address,
          street_suburb,
          street_post_code,
          address,
          suburb,
          post_code,
        } = data;

        const userInfo: UserInfo = {
          userId: role === "general" ? user_id : id,
          phone: phone_number,
          firstName: first_name && first_name,
          lastName: last_name && last_name,
          name: name && name,
          email,
        };

        if (role === "general") {
          if (street_address && street_suburb && street_post_code) {
            userInfo.address = `${street_address}, ${street_suburb}, ${street_post_code}`;
          }
        } else {
          if (address && suburb && post_code) {
            userInfo.address = `${address}, ${suburb}, ${post_code}`;
          }
        }
        setUserInfo(userInfo);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  const renderBluetoothStatus = () => {
    if (isConnecting)
      return (
        <>
          <img
            className="dashboard__user__connection-status"
            src={require("../../../assets/bluetooth/connection-loading.gif")}
            alt="bluetooth-status"
          />
          <div className="dashboard__user__connection-status-text" />
        </>
      );

    return (
      <>
        <img
          className="dashboard__user__connection-status done"
          src={require(`../../../assets/bluetooth/connection-${
            isBluetoothEnable ? "success" : "fail"
          }.gif`)}
          alt="bluetooth-status"
        />
        <IonItem
          className={`dashboard__user__connection-status-text${
            isBluetoothEnable ? " done" : " fail"
          }`}
          button
          onClick={() => setShowAlert(true)}
          lines="none"
        >
          <IonLabel>
            Live Tracing {isBluetoothEnable ? "Enabled" : "Disabled"}
          </IonLabel>
        </IonItem>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Live Tracing"}
          message={"Please have your Bluetooth turned on to enable proceed."}
          buttons={[
            {
              text: "Later",
              role: "later",
              cssClass: "secondary",
            },
            {
              text: "Connect",
              handler: () => {
                handleBleEnable();
              },
            },
          ]}
        />
      </>
    );
  };

  return (
    <IonPage>
      <SideMenu />

      <div className="ion-page dashboard" id="main-content">
        <IonHeader>
          <IonToolbar color="tertiary">
            <div className="dashboard__toolbar">
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle className="ion-text-center">DASHBOARD</IonTitle>
              <IonButtons className="ion-padding-end" slot="end">
                <IonIcon icon={mailOpen} />
              </IonButtons>
            </div>
            <div className="dashboard__user">
              {!isLoading ? (
                renderBluetoothStatus()
              ) : (
                <>
                  <img
                    className="dashboard__user__connection-status"
                    src={require("../../../assets/bluetooth/connection-loading.gif")}
                    alt="bluetooth-status"
                  />
                  <div className="dashboard__user__connection-status-text" />
                </>
              )}
            </div>
          </IonToolbar>
        </IonHeader>
        <DashboardCards
          role={role!}
          userInfo={userInfo}
          isLoading={isLoading}
        />
      </div>
    </IonPage>
  );
};

export default Home;
