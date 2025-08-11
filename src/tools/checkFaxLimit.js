import FingerprintJS from "@fingerprintjs/fingerprintjs";

const MAX_FREE_FAXES = 5;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getUserFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

const checkFaxLimit = async () => {
  const userId = await getUserFingerprint();

  const faxData = JSON.parse(localStorage.getItem("faxData")) || {};
  const userFaxData = faxData[userId] || { timestamps: [] };

  const currentTime = Date.now();

  userFaxData.timestamps = userFaxData?.timestamps?.filter((timestamp) => currentTime - timestamp < ONE_DAY_MS);

  faxData[userId] = userFaxData;
  localStorage.setItem("faxData", JSON.stringify(faxData));

  return userFaxData;
};

const addFaxLocalStorage = async () => {
  const userFaxData = await checkFaxLimit();

  userFaxData.timestamps.push(Date.now());

  const faxData = JSON.parse(localStorage.getItem("faxData")) || {};
  const userId = await getUserFingerprint();
  faxData[userId] = userFaxData;
  localStorage.setItem("faxData", JSON.stringify(faxData));
};

export { checkFaxLimit, addFaxLocalStorage, MAX_FREE_FAXES };
