import axios from "axios";

const getClientSecret = (type, setClientSecret, addError, tipAmount) => {
  const body = {};

  if (type === "Tip" && tipAmount) {
    body.tipAmount = tipAmount;
  }

  axios
    .post(`https://us-central1-senditfax.cloudfunctions.net/faxAPI/stripePayment${type}`, body)
    .then((response) => {
      setClientSecret(response.data.clientSecret);
    })
    .catch(() => {
      addError("Error Creating PaymentIntent.");
    });
};

export default getClientSecret;
