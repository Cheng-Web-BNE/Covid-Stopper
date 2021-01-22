import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const BLE_KEY = "bluetooth-checked";

export const setBleInStorage = async (isChecked: "true" | "false") => {
  await Storage.set({
    key: BLE_KEY,
    value: isChecked,
  });
};

export const getBleInStorage = async () => {
  const { value } = await Storage.get({ key: BLE_KEY });
  return value;
};

export const removeBleInStorage = async () => {
  await Storage.remove({ key: BLE_KEY });
};
