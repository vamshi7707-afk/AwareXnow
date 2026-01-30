// src/api/roleApi.js
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function ensureUserProfile() {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  // create default profile if missing
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email || "",
      name: user.email?.split("@")[0] || "User",
      role: "USER", // manually change one user to ADMIN in Firestore
    });
  }
}

export async function getMyRole() {
  const user = auth.currentUser;
  if (!user) return "GUEST";

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return "USER";
  return snap.data().role || "USER";
}
