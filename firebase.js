import { getApp, getApps, initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDYz5cSwKJK_UUGYbTYg0ZDDE0RLYN6IG8',
  authDomain: 'stories-94912.firebaseapp.com',
  projectId: 'stories-94912',
  storageBucket: 'stories-94912.appspot.com',
  messagingSenderId: '859311234062',
  appId: '1:859311234062:web:0a2a45f75b0ba0491fb05f',
  measurementId: 'G-DJJ331DHFP',
};

// Initialize Firebase
const app = getApps().length ? getApps() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
