import axios from "axios";

class MpesaService {
  constructor() {
    // Sandbox hardcoded credentials (replace with your sandbox keys if different)
    this.consumerKey = "ppXJ2KPOzaRdfnxt7S4KhyQY7zUVBa4shN0NlQHiGBuVfHuK";
    this.consumerSecret = "B4eiauNW29c6jALHJVSHDoSckOq4Ceabyr6vAU5ozXIdwcCSJZSfFtNRO6LSaHWa";
    this.businessShortCode = "174379"; 
    this.passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    this.callbackUrl = "https://261a94ea0c6e.ngrok-free.app/api/bookings/mpesa/callback";
  }

  // Get access token
  async getAccessToken() {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );

    return response.data.access_token;
  }

  // Trigger STK Push
  async stkPush(phoneNumber, amount, accountRef = "EventBooking") {
    const token = await this.getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14); // YYYYMMDDHHMMSS

    const password = Buffer.from(
      this.businessShortCode + this.passkey + timestamp
    ).toString("base64");

    const data = {
      BusinessShortCode: this.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber, // Customer phone in 2547XXXXXXXX format
      PartyB: this.businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: this.callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: "Payment for Event",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
}

export default new MpesaService();
