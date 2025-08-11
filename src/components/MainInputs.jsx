"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Tooltip, Drawer } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "../components/PhoneInput";
import UppyFileUploader from "../components/UppyFileUploader";
import inputErrorsChecker from "../tools/inputErrorsChecker";
import { FaArrowRight } from "react-icons/fa6";
import { checkFaxLimit, addFaxLocalStorage, MAX_FREE_FAXES } from "../tools/checkFaxLimit";
import useAlertStore from "../store/useAlertStore";
import checkNumberType from "../tools/checkNumberType";
import featurePoints from "../utils/featurePoints";
import StripeRootFax from "./StripeRootFax";

export default function MainInputs() {
  // Usage of the Alert Store
  const [addSuccess, addInfo, addWarning, addError] = useAlertStore((state) => [state.addSuccess, state.addInfo, state.addWarning, state.addError]);

  // State for Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fields for Fax Form
  const [sendName, setSendName] = useState("");
  const [sendCompany, setSendCompany] = useState("");
  const [sendEmail, setSendEmail] = useState("");
  const [sendPhone, setSendPhone] = useState("");
  const [receiveName, setReceiveName] = useState("");
  const [receiveCompany, setReceiveCompany] = useState("");
  const [receiveFax, setReceiveFax] = useState("+1");

  const [textArea, setTextArea] = useState("");
  const [uppyFiles, setUppyFiles] = useState([]);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isCoverPageRemoved, setIsCoverPageRemoved] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Fields for Input Errors
  const [inputErrors, setInputErrors] = useState({
    senderName: { hasError: false, isInteracted: false },
    senderEmail: { hasError: false, isInteracted: false },
    senderPhone: { hasError: false, isInteracted: false },
    receiverName: { hasError: false, isInteracted: false },
    receiverFax: { hasError: false, isInteracted: false },
  });

  // Main function to Check Inputs and Send Fax
  const sendFaxHandler = async (isPayment) => {
    // Checking for Inputs' Errors and Warnings
    inputErrorsChecker("senderName", sendName, setInputErrors);
    inputErrorsChecker("senderEmail", sendEmail, setInputErrors);
    inputErrorsChecker("senderPhone", sendPhone, setInputErrors);
    inputErrorsChecker("receiverName", receiveName, setInputErrors);
    inputErrorsChecker("receiverFax", receiveFax, setInputErrors);

    // Inform User about Errors and Warnings
    if (!Object.values(inputErrors).every((input) => input.isInteracted === true && input.hasError === false))
      return addError("Please fill in the required fields.");

    if (!captchaValue) {
      return addError("Please complete the CAPTCHA verification.");
    }

    // Check Number Type for Fax
    if (!checkNumberType(receiveFax)) {
      return addError("The number you entered is not a fax number.");
    }

    // Checking for Text Area and Files
    if (textArea === "" && uppyFiles.length === 0) {
      return addError("The Text Area is empty and no files are selected");
    } else {
      if (textArea === "" && !isCoverPageRemoved) addWarning("The Text Area field is empty");
      if (uppyFiles.length === 0 && !window.confirm("Do you really want to send a fax without attaching a file first?")) {
        addWarning("No files are selected");
        return;
      }
    }

    // Checkbox only for Paid Faxes
    if (!isPayment && isCoverPageRemoved) {
      addWarning("Checkbox (Remove Cover Page) is selected on the free plan");
    }

    // Checking for Total Pages
    if (!isPayment && totalPages > 3) {
      addWarning("You have exceeded the maximum limit of 3 pages (Free Plan). For a paid plan, the maximum is 25 pages");
    }

    // Sending a free fax or opening a StripeSidebar
    if (isPayment) {
      setIsSidebarOpen(true);
    } else {
      addInfo("Fax request initiated!\nWaiting for status message");

      // Creating FormData to Send Fax
      const formData = new FormData();
      formData.append("senderName", sendName);
      formData.append("senderEmail", sendEmail);
      formData.append("senderPhone", sendPhone);
      formData.append("receiverName", receiveName);
      formData.append("receiverFax", receiveFax);
      formData.append("textArea", textArea);
      formData.append("totalPages", totalPages);

      if (sendCompany !== "") formData.append("senderCompany", sendCompany);
      if (receiveCompany !== "") formData.append("receiverCompany", receiveCompany);

      uppyFiles.forEach((file) => formData.append("files", file.data));

      try {
        const response = await fetch("/api/sendFaxFree", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        addSuccess(`${result.msg}\nID - ${result.id} | Status - ${result.status}`);

        if (!isPayment) {
          addFaxLocalStorage();
        }

        setTimeout(() => {
          window.location.href = `/status/${result.id}`;
        }, 2500);
      } catch (error) {
        addError(error.error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full gap-6 md:flex-row md:gap-8">
        <div className="flex flex-col items-center w-full gap-1 input-info-new">
          <h2 className="font-semibold text-center text-base border-b-2 border-b-[#1878f3] border-solid mb-5 cursor-default">SENDER INFORMATION</h2>

          <TextField
            size="small"
            sx={{
              fontSize: "14px",
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            className="w-full"
            label="Name"
            variant="outlined"
            value={sendName}
            required
            onChange={(e) => setSendName(e.target.value)}
            error={inputErrors.senderName.hasError}
            helperText={inputErrors.senderName.hasError ? "Please enter your name." : <>{"\u00a0"}</>}
            onBlur={(e) => inputErrorsChecker("senderName", e.target.value, setInputErrors)}
          />

          <TextField
            size="small"
            sx={{
              fontSize: "14px",
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            className="w-full"
            label="Company"
            variant="outlined"
            value={sendCompany}
            onChange={(e) => setSendCompany(e.target.value)}
            helperText={<>{"\u00a0"}</>}
          />

          <TextField
            size="small"
            sx={{
              fontSize: "14px",
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            className="w-full"
            label="Email"
            variant="outlined"
            value={sendEmail}
            required
            onChange={(e) => setSendEmail(e.target.value)}
            error={inputErrors.senderEmail.hasError}
            helperText={inputErrors.senderEmail.hasError ? "Please enter your email." : <>{"\u00a0"}</>}
            onBlur={(e) => inputErrorsChecker("senderEmail", e.target.value, setInputErrors)}
          />

          <PhoneInput
            className="w-full"
            value={sendPhone}
            onChange={setSendPhone}
            error={inputErrors.senderPhone.hasError}
            helperText={inputErrors.senderPhone.hasError ? "Please enter your valid phone." : <>{"\u00a0"}</>}
            onBlur={(e) => inputErrorsChecker("senderPhone", e.target.value, setInputErrors)}
          />
        </div>
        <div className="flex flex-col items-center w-full gap-1 input-info-new">
          <h2 className="text-base font-semibold text-center border-b-2 border-b-[#1878f3] mb-5 border-solid cursor-default">RECEIVER INFORMATION</h2>

          <TextField
            size="small"
            sx={{
              fontSize: "14px",
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            className="w-full"
            label="Name"
            variant="outlined"
            value={receiveName}
            required
            onChange={(e) => setReceiveName(e.target.value)}
            error={inputErrors.receiverName.hasError}
            helperText={inputErrors.receiverName.hasError ? "Please enter your name." : <>{"\u00a0"}</>}
            onBlur={(e) => inputErrorsChecker("receiverName", e.target.value, setInputErrors)}
          />

          <TextField
            size="small"
            sx={{
              fontSize: "14px",
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            className="w-full"
            label="Company"
            variant="outlined"
            value={receiveCompany}
            onChange={(e) => setReceiveCompany(e.target.value)}
            helperText={<>{"\u00a0"}</>}
          />

          <PhoneInput
            className="w-full"
            isReceiver={true}
            value={receiveFax}
            onChange={setReceiveFax}
            error={inputErrors.receiverFax.hasError}
            helperText={inputErrors.receiverFax.hasError ? "Please enter valid US or Canadian Fax." : <>{"\u00a0"}</>}
            onBlur={(e) => inputErrorsChecker("receiverFax", e.target.value, setInputErrors)}
            countryCodeEditable={false}
            onlyNorthAmerica={true}
          />
        </div>
      </div>

      <div className="p-4 w-full flex flex-col items-center gap-5 text-center bg-[#efefef] border-2 border-solid border-[#1878f3]">
        <h2 className="w-full text-base font-semibold cursor-default">FAX INFORMATION</h2>

        <div className="flex flex-col items-center text-sm w-full max-w-[350px]">
          <h3 className="cursor-default">
            Attach <span className="underline">one or more files</span> (DOC, DOCX, or PDF)
          </h3>
          <p className="text-center cursor-default">Attach all files now, can't add more later. Total page limit is 3 (free) or 25 (paid) pages.</p>

          <UppyFileUploader uppyFiles={uppyFiles} setUppyFiles={setUppyFiles} totalPages={totalPages} setTotalPages={setTotalPages} />
        </div>

        <div className="w-full text-sm">
          <h3 className="cursor-default">Enter text below to appear on the cover page:</h3>
          <p className="cursor-default">(Text is optional. You can use only an attachment, just text, or both.)</p>

          <textarea
            id="coverPageText"
            className={`w-full h-[100px] text-sm resize-none mt-3 outline-none 
            ${isCoverPageRemoved ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white"} 
            transition-colors duration-200`}
            placeholder="Text for CoverPage (Max 500 characters)"
            maxLength="500"
            value={isCoverPageRemoved ? "" : textArea}
            onChange={(e) => setTextArea(e.target.value)}
            disabled={isCoverPageRemoved}
          />

          <div className="flex items-center justify-center text-sm">
            <input
              className="mr-2"
              type="checkbox"
              name="checkbox"
              id="checkbox_id"
              defaultChecked={isCoverPageRemoved}
              onChange={(e) => setIsCoverPageRemoved(e.target.checked)}
            />
            <label htmlFor="checkbox_id">Remove Cover Page (only Paid Faxes)</label>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full overflow-x-auto p-5">
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY} onChange={(val) => setCaptchaValue(val)} />
      </div>

      <div className="flex flex-col justify-between w-full gap-6 text-sm md:flex-row md:gap-8">
        <div className="flex flex-col w-full gap-3 cursor-default">
          <h2 className="text-base font-semibold">FREE FAX</h2>

          <ul>
            {featurePoints["Free"].map((el, i) => (
              <li key={i} className="flex items-center">
                <FaArrowRight className="mr-2" size={12} /> {el}
              </li>
            ))}
          </ul>

          <Tooltip
            title={
              isCoverPageRemoved
                ? "Removed Cover Page Available only for Paid Faxes"
                : totalPages < 3
                ? "Send Fax Free"
                : "You have exceeded the maximum limit of 3 pages (Free Plan)"
            }
          >
            <span className="mt-auto">
              <Button
                variant="outlined"
                type="button"
                sx={{ color: "white", backgroundColor: "#1878F3", fontWeight: 600 }}
                disabled={totalPages > 3 || isCoverPageRemoved}
                onClick={async () => {
                  const faxData = await checkFaxLimit();

                  if (faxData?.timestamps?.length >= MAX_FREE_FAXES) {
                    return addError("You have exceeded the limit of 3 free faxes in the last 24 hours.");
                  }

                  sendFaxHandler(false);
                }}
              >
                SEND FREE FAX NOW
              </Button>
            </span>
          </Tooltip>
        </div>

        <div className="flex flex-col w-full gap-3 cursor-default">
          <h2 className="text-base font-semibold">ALMOST FREE FAX</h2>

          <ul>
            {featurePoints["Paid"].map((el, i) => (
              <li key={i} className="flex items-center">
                <FaArrowRight className="mr-2" size={12} /> {el}
              </li>
            ))}
          </ul>

          <Tooltip title="Send Fax Paid">
            <span className="mt-auto">
              <Button
                variant="outlined"
                type="button"
                onClick={() => sendFaxHandler(true)}
                sx={{ color: "white", backgroundColor: "#1878F3", fontWeight: 600 }}
              >
                SEND $1.99 FAX NOW
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="flex flex-col w-full gap-4 fax-dev-buttons md:flex-row mt-5">
          <Button
            variant="contained"
            onClick={() => {
              const phoneNumber = prompt("Enter a phone number:", "+12132942943");
              if (!phoneNumber) {
                console.log("No phone number provided.");
                return;
              }
              const region = "US";

              try {
                const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
                const parsedNumber = phoneUtil.parse(phoneNumber, region);
                const type = phoneUtil.getNumberType(parsedNumber);

                // Can be Fax - 0, 2, 3, 4, 5, 6
                // Definitely not a Fax: 1, 7, 8, 9, 10, 99
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

                if ([0, 2, 3, 4, 5, 6].includes(type)) {
                  addSuccess(`Number: ${phoneNumber} - is Valid. Type - ${typeMap[type]}`);
                } else {
                  addError(`Number: ${phoneNumber} - is Invalid. Type - ${typeMap[type]}`);
                }
              } catch {
                addError("Phone Number is Invalid");
              }
            }}
          >
            Check Phone Type
          </Button>

          <Button
            variant="contained"
            type="button"
            onClick={() => {
              setSendName("senderNameTEST-Next");
              setSendCompany("senderCompanyTEST-Next");
              setSendEmail("senderEmail-Next@TEST.com");
              setSendPhone("+12014829255");
              setReceiveName("receiverNameTEST-Next");
              setReceiveCompany("receiverCompanyTEST-Next");
              setReceiveFax("+18339794115");
              setTextArea("Next JS 15 - Test Text Area");

              setInputErrors((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, { hasError: false, isInteracted: true }])));
            }}
          >
            Insert Test Data
          </Button>

          <Tooltip title="This will be a server function to update (every 5-10 min)">
            <span>
              <Button
                variant="contained"
                type="button"
                onClick={() => {
                  axios
                    .get("https://us-central1-senditfax.cloudfunctions.net/faxAPI/updateFaxes")
                    .then(function (response) {
                      addInfo(response.data.message);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                Update All Faxes
              </Button>
            </span>
          </Tooltip>

          <Button
            variant="contained"
            type="button"
            onClick={() => {
              const faxId = prompt("Enter Fax Id:");
              window.open(`/status/${faxId}`, "_blank");
            }}
          >
            Get Status
          </Button>

          <Button
            variant="contained"
            type="button"
            color="error"
            onClick={() => {
              throw new Error("Testing Sentry Error Reporting!");
            }}
          >
            Test Sentry
          </Button>
        </div>
      )}

      <Drawer anchor="right" size="md" open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <StripeRootFax
          setIsSidebarOpen={setIsSidebarOpen}
          formDataObject={{
            sendName,
            sendCompany,
            sendEmail,
            sendPhone,
            receiveName,
            receiveCompany,
            receiveFax,
            textArea,
            uppyFiles,
            isCoverPageRemoved,
            totalPages,
          }}
        />
      </Drawer>
    </>
  );
}
