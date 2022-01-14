import firebase from "./firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDeZ13kHssSYZalDH1TCTK7X2ZXQT-qqP4",
  authDomain: "icinema-8eedf.firebaseapp.com",
  projectId: "icinema-8eedf",
  storageBucket: "icinema-8eedf.appspot.com",
  messagingSenderId: "803828566004",
  appId: "1:803828566004:web:a7771b8e2483fedc3fdba1",
  measurementId: "G-XD7PN5L1WV",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
