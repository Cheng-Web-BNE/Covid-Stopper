import validator from "validator";
import { GeneralLoginPayload, GeneralRegisterPayload } from "../../../api/user";

interface RawRegisterPayload extends GeneralRegisterPayload {
    repeat_password: string;
}

function isRegisterPayload(
    payloadType: RawRegisterPayload | GeneralLoginPayload
): payloadType is RawRegisterPayload {
    if (
        (payloadType as RawRegisterPayload).repeat_password !== undefined &&
        (payloadType as RawRegisterPayload).email !== undefined
    ) {
        return true;
    }
    return false;
}

export default (
    formData: RawRegisterPayload | GeneralLoginPayload,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
    let isValid = true;
    Object.values(formData).forEach((data) => {
        if (!data) {
            setError("Please complete all sections of this form");
            isValid = false;
        }
    });
    if (!isRegisterPayload(formData)) return isValid;

    if (formData.password !== formData.repeat_password) {
        setError("Passwords do not match");
        isValid = false;
    }
    if (!validator.isEmail(formData.email)) {
        setError("Please enter valid email address");
        isValid = false;
    }
    return isValid;
};
