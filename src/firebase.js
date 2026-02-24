// src/firebase.js
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCECjmRqyLnJ0dvkVHr_OjO_hew7zQzc-A",
  authDomain: "awarexnow.firebaseapp.com",
  databaseURL: "https://awarexnow-default-rtdb.firebaseio.com",
  projectId: "awarexnow",
  storageBucket: "awarexnow.firebasestorage.app",
  messagingSenderId: "892314768158",
  appId: "1:892314768158:web:402703dea2663ecbf82f0f",
  measurementId: "G-3CD2PXLW4N",
};

// ✅ Stop double-initialize in StrictMode / hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// ✅ IMPORTANT: use memory cache to avoid IndexedDB watch-stream crash
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
});

export const storage = getStorage(app);

export default app;