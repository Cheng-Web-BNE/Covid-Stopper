import BluetoothSetting from "../components/BluetoothSetting";
import { CommercialInfo } from "../components/CommercialInfo";

const COMMERCIAL_REGISTRATION_JOURNEY = [
    { progressName: "commercialInfo", component: CommercialInfo },
    // { progressName: "Verification", component: Verification }, // no verification yet
    { progressName: "bluetoothSetting", component: BluetoothSetting },
];

export default COMMERCIAL_REGISTRATION_JOURNEY;
