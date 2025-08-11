import libphonenumber from "google-libphonenumber";

const checkNumberType = (number) => {
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parse(number, "US");
  const type = phoneUtil.getNumberType(parsedNumber);

  // Can be Fax - 0, 2, 3, 4, 5, 6
  // Definitely not a Fax: 1, 7, 8, 9, 10
  const typeMap = {
    0: "Fixed line", // + Landline numbers (home, office, fax).
    1: "Mobile", // - Mobile phone numbers.
    2: "Fixed line or mobile", // + Can be either landline or mobile.
    3: "Toll free", // + Freephone numbers (e.g., 800 numbers).
    4: "Premium rate", // + Premium services with higher call costs.
    5: "Shared cost", // + Shared call cost (caller and receiver).
    6: "VoIP", // + Internet-based phone numbers (e.g., Skype).
    7: "Personal number", // - Personal numbers with call forwarding.
    8: "Pager", // - Pager numbers for receiving messages.
    9: "UAN", // - Universal Access Numbers (special services).
    10: "Voicemail", // - Voicemail numbers for storing messages.
    99: "Unknown", // ? Unclassified or unknown number type.
  };

  return [0, 2, 3, 4, 5, 6].includes(type);
};

export default checkNumberType;
