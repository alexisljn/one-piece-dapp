const {initializeApp} = require("firebase/app");
const {getDatabase, ref, get, child} = require("firebase/database");
const {getAuth, signInWithEmailAndPassword} = require("firebase/auth");

let firebaseInstance;

let firebaseConfig;

let databaseAdminCredentials;

let firebaseDatabase;

async function initializeFirebaseApp() {
    setConfigValuesFromEnvVars()
    firebaseInstance = initializeApp(firebaseConfig);
    await logAsDatabaseAdmin();
    await initializeDatabase()
    console.log(databaseAdminCredentials)
}

function setConfigValuesFromEnvVars() {
    firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    };
}

async function logAsDatabaseAdmin() {
    const auth = getAuth();
    databaseAdminCredentials = await signInWithEmailAndPassword(
        auth,
        process.env.FIREBASE_ADMIN_ID,
        process.env.FIREBASE_ADMIN_PASSWORD
    );
}

async function initializeDatabase() {
    firebaseDatabase = getDatabase(firebaseInstance);
    // const dbRef = ref(firebaseDatabase);
    // const snapshot = await get(child(dbRef, 'skills'))
    // console.log(snapshot.val())

}

exports.initializeFirebaseApp = initializeFirebaseApp;
