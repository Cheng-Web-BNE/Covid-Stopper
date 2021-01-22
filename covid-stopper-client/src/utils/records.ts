import CryptoJs from "crypto-js";
import moment from "moment";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const RECORD_KEY = "customer-records";

export interface CustomerRecord {
    userId: number | string;
    phone: number | string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    time: string;
    date: string;
}
export interface RecordInStores {
    [date: string]: CustomerRecord[];
}

export const storeRecords = async (data: CustomerRecord) => {
    const oldRecords: RecordInStores = await getRecords();

    data.time = moment().format("HH:mm");
    data.date = moment().format("MM/DD/YY");

    // records format:
    // {
    //  "10/07/20": [{...record}, {...record}, {...record}],
    //  "09/07/20": [{...record}, {...record}, {...record}],
    //  "07/07/20": [{...record}, {...record}, {...record}]
    // }
    if (oldRecords) {
        if (oldRecords[data.date]) {
            oldRecords[data.date].push(data);
        } else {
            oldRecords[data.date] = [data];
        }
    }

    await Storage.set({
        key: RECORD_KEY,
        value: !!oldRecords
            ? JSON.stringify(oldRecords)
            : JSON.stringify({ [data.date]: [data] }),
    });
};

// output: user info in object type
export const getRecords = async () => {
    const ret = await Storage.get({ key: RECORD_KEY });
    if (!ret.value) return;
    return JSON.parse(ret.value);
};

const RC4SECRET = "d1qi34t128cba9qye(*^*dshq2(^wdgi23";

// RC4 encryption
export const encryptHealthCode = (userInfo: string) =>
    CryptoJs.RC4.encrypt(userInfo, RC4SECRET).toString();

export const decryptHealthCode = (encrypted: string) => {
    const decrypted = CryptoJs.RC4.decrypt(encrypted, RC4SECRET);
    return decrypted.toString(CryptoJs.enc.Utf8);
};
