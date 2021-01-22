import validator from "validator";
import {
    CommercialLoginPayload,
    CommercialRegisterPayload,
} from "../../../api/user";

interface RawRegisterPayload extends CommercialRegisterPayload {
    repeat_password: string;
}

function isRegisterPayload(
    payloadType: RawRegisterPayload | CommercialLoginPayload
): payloadType is RawRegisterPayload {
    if (
        (payloadType as RawRegisterPayload).phone_number !== undefined &&
        (payloadType as RawRegisterPayload).repeat_password !== undefined &&
        (payloadType as RawRegisterPayload).email !== undefined
    ) {
        return true;
    }
    return false;
}

export default (
    formData: RawRegisterPayload | CommercialLoginPayload,
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
