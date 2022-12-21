var admin = require("firebase-admin");
require("dotenv").config();

var serviceAccount = require("./../serviceAction.json");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "appointmentapi-7f945",
    private_key_id: process.env.PRIVKEYID,
    private_key: PRIVKEYID,
    client_email:
      "firebase-adminsdk-r9i7r@appointmentapi-7f945.iam.gserviceaccount.com",
    client_id: "111204007359243064713",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r9i7r%40appointmentapi-7f945.iam.gserviceaccount.com",
  }),
  databaseURL: "https://server-auth-41acc.firebaseio.com",
});

module.exports = admin;
