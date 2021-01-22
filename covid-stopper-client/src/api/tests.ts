import { post } from "./axois";

const BASE_URL = "https://covid-stopper.momacorps.com";
const SWAB_URL = "/SwabKitTest";
const CLINIC_URL = "/ClinicTest";
const DRIVE_URL = "/DriveThroughTest";
const LIST_URL = "/listAppointmentOrRequest";
const LIST_CLINIC_URL = "/listClinicInfo";
const LIST_DRIVE_THROUGH_URL = "/listDriveThroughInfo";
const READ_URL = "/readAppointmentOrRequest";
const ADD_URL = "/addAppointmentOrRequest";
const CANCEL_URL = "/cancelAppointmentOrRequest";
export interface SwabKitPayload {
  token: string | null;
}

export interface ClinicPayload {
  token: string | null;
  test_clinic_id: number;
  time: string;
  date: string;
}

export interface DrivePayload {
  token: string | null;
  test_drive_through_id: number;
}

export interface ListTestPayload {
  token: string | null;
}

export interface ClinicInfoPayload {}

export const listClinicInfo = async (payload: ClinicInfoPayload) => {
  const url = `${BASE_URL}${CLINIC_URL}${LIST_CLINIC_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const listDriveThroughInfo = async (payload: ClinicInfoPayload) => {
  const url = `${BASE_URL}${DRIVE_URL}${LIST_DRIVE_THROUGH_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const listClinicAppointments = async (payload: ListTestPayload) => {
  const url = `${BASE_URL}${CLINIC_URL}${LIST_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const listDriveThroughAppointments = async (payload: ListTestPayload) => {
  const url = `${BASE_URL}${DRIVE_URL}${LIST_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const listSwabKitRequests = async (payload: ListTestPayload) => {
  const url = `${BASE_URL}${SWAB_URL}${LIST_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const listSwabKitAppointments = async (token: string) => {
  return post(`${BASE_URL}${SWAB_URL}${LIST_URL}`, JSON.stringify({ token }));
};

export const addSwabKitTest = async (payload: SwabKitPayload) => {
  const url = `${BASE_URL}${SWAB_URL}${ADD_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const addClinicTest = async (payload: ClinicPayload) => {
  const url = `${BASE_URL}${CLINIC_URL}${ADD_URL}`;
  return await post(url, JSON.stringify(payload));
};

export const addDriveTest = async (payload: DrivePayload) => {
  const url = `${BASE_URL}${DRIVE_URL}${ADD_URL}`;
  return await post(url, JSON.stringify(payload));
};
