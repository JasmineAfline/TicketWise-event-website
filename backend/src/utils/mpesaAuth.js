// backend/src/utils/mpesaAuth.js
const axios = require("axios");

async function getToken() {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;

  // Encode key:secret into base64
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  try {
    // Request access token from Safaricom
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (err) {
    console.error(
      " Failed to get Mpesa token:",
      err.response?.data || err.message
    );
    throw new Error("Mpesa authentication failed");
  }
}

module.exports = { getToken };
