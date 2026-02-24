// src/api/campaignApi.js

import { auth, db, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* =========================================================
   CREATE CAMPAIGN
========================================================= */
export async function createCampaign({
  title,
  description,
  donateUrl,
  imageFile,
}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  let imageUrl = "";
  let imagePath = "";

  // Optional image upload
  if (imageFile) {
    imagePath = `campaignImages/${user.uid}/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "campaigns"), {
    title: title || "",
    description: description || "",
    donateUrl: donateUrl || "",
    imageUrl,
    imagePath,

    createdBy: user.uid,
    createdByName: user.email || "",

    createdAt: serverTimestamp(),

    status: "PENDING",
    reviewedBy: null,
    reviewedAt: null,
    reviewNote: "",
  });
}

/* =========================================================
   INTERNAL HELPERS
========================================================= */
function mapSnapshot(snap) {
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

function safeListener(q, setData) {
  return onSnapshot(
    q,
    (snap) => setData(mapSnapshot(snap)),
    (error) => {
      console.error("Firestore listener error:", error);
      setData([]);
    }
  );
}

/* =========================================================
   LISTENERS
========================================================= */

// Everyone can see approved campaigns
export function listenApprovedCampaigns(setCampaigns) {
  const q = query(
    collection(db, "campaigns"),
    where("status", "==", "APPROVED"),
    orderBy("createdAt", "desc")
  );
  return safeListener(q, setCampaigns);
}

// Admin review page: pending campaigns
export function listenPendingCampaigns(setCampaigns) {
  const q = query(
    collection(db, "campaigns"),
    where("status", "==", "PENDING"),
    orderBy("createdAt", "desc")
  );
  return safeListener(q, setCampaigns);
}

/**
 * IMPORTANT:
 * Pass uid instead of reading auth.currentUser inside.
 * Prevents null-user + StrictMode duplicate listener crash.
 */
export function listenMyCampaigns(uid, setCampaigns) {
  if (!uid) {
    setCampaigns([]);
    return () => {};
  }

  const q = query(
    collection(db, "campaigns"),
    where("createdBy", "==", uid),
    orderBy("createdAt", "desc")
  );

  return safeListener(q, setCampaigns);
}

/* For admin approved list (reuse approved listener) */
export function listenApprovedCampaignsForAdmin(setCampaigns) {
  return listenApprovedCampaigns(setCampaigns);
}

/* =========================================================
   ADMIN ACTIONS
========================================================= */

export async function approveCampaign(id) {
  await updateDoc(doc(db, "campaigns", id), {
    status: "APPROVED",
    reviewedBy: auth.currentUser?.uid || null,
    reviewedAt: serverTimestamp(),
    reviewNote: "",
  });
}

export async function denyCampaign(id, note = "") {
  await updateDoc(doc(db, "campaigns", id), {
    status: "DENIED",
    reviewedBy: auth.currentUser?.uid || null,
    reviewedAt: serverTimestamp(),
    reviewNote: note || "",
  });
}

export async function deleteCampaign(id) {
  await deleteDoc(doc(db, "campaigns", id));
}

/* =========================================================
   SEED SAMPLE DATA
========================================================= */

export async function seedSampleCampaigns() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const samples = [
    {
      title: "Support Local, Shop Ethical",
      description: "Promote local small businesses that follow ethical and sustainable practices.",
      donateUrl: "https://example.com/donate-local",
    },
    {
      title: "Clean Streets, Strong Communities",
      description: "Organise community clean-up drives to reduce litter and improve public spaces.",
      donateUrl: "https://example.com/donate-cleanup",
    },
    {
      title: "Mental Health Matters",
      description: "Raise awareness about mental health and reduce stigma.",
      donateUrl: "https://example.com/donate-mentalhealth",
    },
  ];

  for (const s of samples) {
    await addDoc(collection(db, "campaigns"), {
      ...s,
      imageUrl: "",
      imagePath: "",
      createdBy: user.uid,
      createdByName: user.email || "",
      createdAt: serverTimestamp(),
      status: "PENDING",
      reviewedBy: null,
      reviewedAt: null,
      reviewNote: "",
    });
  }
}