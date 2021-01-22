import jwt from "jsonwebtoken";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const AUTH_KEY = "covid-stopper-authority";
const ROLE_KEY = "covid-stopper-role";

export const setAuth = async (token: string) => {
    await Storage.set({
        key: AUTH_KEY,
        value: token,
    });
    const decoded: any = jwt.decode(token!);
    await Storage.set({
        key: ROLE_KEY,
        value: decoded.role,
    });
};

export const getAuth = async () => {
    const { value } = await Storage.get({ key: AUTH_KEY });
    return value;
};

export const removeAuthAndRole = async () => {
    await Storage.remove({ key: AUTH_KEY });
    await Storage.remove({ key: ROLE_KEY });
};

export const getRole = async () => {
    const { value } = await Storage.get({ key: ROLE_KEY });
    return value;
};

export const isLoggedIn = async () => {
    const now = Math.floor(Date.now() / 1000);
    const token = await getAuth();

    if (!token) return false;

    const decoded: any = jwt.decode(token!);
    const isActive = decoded.exp - now > 0;
    return isActive;
};
