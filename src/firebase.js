require('dotenv').config()

const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const db = getFirestore()
module.exports = {
db
}

