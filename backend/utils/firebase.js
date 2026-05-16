const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: privateKey,
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
