import { getRole } from "../utils/auth";
import { post } from "./axois";

const BASE_URL = "http://covid-stopper.momacorps.com";
const MEMBER_URL = "/member";
const COMMERCIAL_MEMBER_URL = "/commercial";
const LOGIN_URL = "/login";
const REGISTER_URL = "/register";
const READ_GENERAL_MEMBER_URL = "/readMember";
const READ_COMMERCIAL_MEMBER_URL = "/readCommercialMember";
const UPDATE_GENERAL_MEMBER_URL = "/updateMember";

export type UserType = "general" | "commercial";
export interface GeneralLoginPayload {
    phone_number: string;
    password: string;
    role?: "general";
}
export interface GeneralRegisterPayload extends GeneralLoginPayload {
    first_name: string;
    last_name: string;
    email: string;
    role?: "general";
}

export interface CommercialLoginPayload {
    name: string;
    password: string;
    role?: "commercial";
}

export interface CommercialRegisterPayload extends CommercialLoginPayload {
    phone_number: string;
    email: string;
    role?: "commercial";
}

export interface GeneralUpdatePayload {
    token: string | null;
    phone_number: string;
    email: string;
    street_address: string;
    street_suburb: string;
    street_post_code: string;
    password: string;
}

export interface GeneralReadPayload {
    token: string | null;
}

export const generalMemberUpdate= async (payload: GeneralUpdatePayload) => {
    const url = `${BASE_URL}${MEMBER_URL}${UPDATE_GENERAL_MEMBER_URL}`;
    return await post(url, JSON.stringify(payload));
};

export const generalMemberRead= async (payload: GeneralReadPayload) => {
    const url = `${BASE_URL}${MEMBER_URL}${READ_GENERAL_MEMBER_URL}`;
    return await post(url, JSON.stringify(payload));
};

const isGeneralOrCommercial = (
    payload: GeneralLoginPayload | CommercialLoginPayload
): payload is GeneralLoginPayload => {
    if ((payload as GeneralLoginPayload).phone_number !== undefined) {
        return true;
    }
    return false;
};

export const memberLogin = async (
    payload: GeneralLoginPayload | CommercialLoginPayload
) => {
    isGeneralOrCommercial(payload)
        ? (payload.role = "general")
        : (payload.role = "commercial");
    const url = `${BASE_URL}${MEMBER_URL}${LOGIN_URL}`;
    return await post(url, JSON.stringify(payload));
};

export const generalMemberRegister = async (
    payload: GeneralRegisterPayload
) => {
    return await post(
        `${BASE_URL}${MEMBER_URL}${REGISTER_URL}`,
        JSON.stringify(payload)
    );
};

export const commercialMemberRegister = async (
    payload: CommercialRegisterPayload
) => {
    return await post(
        `${BASE_URL}${MEMBER_URL}${REGISTER_URL}${COMMERCIAL_MEMBER_URL}`,
        JSON.stringify(payload)
    );
};

export const getMemberInfo = async (token: string) => {
    const role = await getRole();
    return await post(
        `${BASE_URL}${MEMBER_URL}${
            role === "general"
                ? READ_GENERAL_MEMBER_URL
                : READ_COMMERCIAL_MEMBER_URL
        }`,
        JSON.stringify({ token })
    );
};

