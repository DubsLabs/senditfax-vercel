import { PhoneNumberUtil } from "google-libphonenumber";

const inputErrorsChecker = (field, value, setErrors) => {
  let isError = false;
  const phoneUtil = PhoneNumberUtil.getInstance();

  if (value.trim() === "") {
    isError = true;
  } else {
    if (field === "senderEmail") {
      isError = !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    } else if (field === "receiverFax" || field === "senderPhone") {
      if (phoneUtil.isPossibleNumberString(value)) {
        const number = phoneUtil.parse(value);
        isError = !phoneUtil.isValidNumber(number);
      } else {
        isError = true;
      }
    }
  }

  setErrors((errors) => {
    const updatedErrors = {
      ...errors,
      [field]: {
        hasError: isError,
        isInteracted: true,
      },
    };
    return updatedErrors;
  });
};

export default inputErrorsChecker;
