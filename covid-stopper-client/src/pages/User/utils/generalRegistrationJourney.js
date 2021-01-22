import { GeneralInfo } from "../components/GeneralInfo";
import BluetoothSetting from "../components/BluetoothSetting";

const GENERAL_REGISTRATION_JOURNEY = [
    { progressName: "generalInfo", component: GeneralInfo },
    // { progressName: "Verification", component: Verification }, // no verification yet
    { progressName: "bluetoothSetting", component: BluetoothSetting },
];

export default GENERAL_REGISTRATION_JOURNEY;
