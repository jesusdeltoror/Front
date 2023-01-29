import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyBJmUWIc0hnaHXKHfj6hvQLx-rZBWkH_KM",
    authDomain: "clasesistemas-a0b6a.firebaseapp.com",
    projectId: "clasesistemas-a0b6a",
    storageBucket: "clasesistemas-a0b6a.appspot.com",
    messagingSenderId: "417053925865",
    appId: "1:417053925865:web:6e0ccb96a4876e42392b78",
    measurementId: "G-DPTS2Q7JQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export {app, db}
