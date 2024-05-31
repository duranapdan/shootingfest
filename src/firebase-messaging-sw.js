// Import the scripts needed for Firebase Messaging.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyBXR1xHU7tNdCTpDElT5WugPBnxA8AD8e8",
  authDomain: "shooting-fest-10fa5.firebaseapp.com",
  projectId: "shooting-fest-10fa5",
  storageBucket: "shooting-fest-10fa5.appspot.com",
  messagingSenderId: "378608885105",
  appId: "1:378608885105:web:59efb69e4ca5ca85da2ad0",
  measurementId: "G-Y3Q3HV9Q8G",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
