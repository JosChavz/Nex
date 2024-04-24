import { initializeApp } from '@firebase/app';
import { getAnalytics, isSupported } from '@firebase/analytics';
import { getAuth } from '@firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOQDjbMTBQ456DpUd_w_3lMdYeX_Z5UNU',
  authDomain: 'nexprojects-a573d.firebaseapp.com',
  projectId: 'nexprojects-a573d',
  storageBucket: 'nexprojects-a573d.appspot.com',
  messagingSenderId: '463169258544',
  appId: '1:463169258544:web:5d32669945ab9dd9ad19f5',
  measurementId: 'G-EEXXYKKD2Z',
};

// Initialize Firebase
export const APP = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(APP) : null));
export const AUTH = getAuth(APP);
