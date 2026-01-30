// 1️⃣ IMPORTS (must be at the very top)
import { auth, db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 2️⃣ CREATE CAMPAIGN (PASTE YOUR FUNCTION HERE)
export async function createCampaign({
  title,
  description,
  imageFile,
  donateUrl,
}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  let imageUrl = "";

  if (imageFile) {
    const fileRef = ref(
      storage,
      `campaign-images/${user.uid}/${Date.now()}_${imageFile.name}`
    );
    await uploadBytes(fileRef, imageFile);
    imageUrl = await getDownloadURL(fileRef);
  }

  await addDoc(collection(db, "campaigns"), {
    title,
    description,
    imageUrl,
    donateUrl: donateUrl || "",
    createdBy: user.uid,
    createdByName: user.email,
    createdAt: serverTimestamp(),
    status: "PENDING",
  });
}

// 3️⃣ LISTENERS
export function listenApprovedCampaigns(setCampaigns) {
  const q = query(
    collection(db, "campaigns"),
    where("status", "==", "APPROVED"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    setCampaigns(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function listenPendingCampaigns(setCampaigns) {
  const q = query(
    collection(db, "campaigns"),
    where("status", "==", "PENDING"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    setCampaigns(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function listenMyCampaigns(setCampaigns) {
  const user = auth.currentUser;
  if (!user) return () => {};

  const q = query(
    collection(db, "campaigns"),
    where("createdBy", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    setCampaigns(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

// 4️⃣ ADMIN ACTIONS
export async function approveCampaign(id) {
  await updateDoc(doc(db, "campaigns", id), {
    status: "APPROVED",
    reviewedAt: serverTimestamp(),
  });
}

export async function denyCampaign(id, note = "") {
  await updateDoc(doc(db, "campaigns", id), {
    status: "DENIED",
    reviewNote: note,
    reviewedAt: serverTimestamp(),
  });
}

export async function deleteCampaign(id) {
  await deleteDoc(doc(db, "campaigns", id));
}
export function listenApprovedCampaignsForAdmin(setCampaigns) {
  const q = query(
    collection(db, "campaigns"),
    where("status", "==", "APPROVED"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    setCampaigns(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function seedSampleCampaigns() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const samples = [
    {
      title: "Support Local, Shop Ethical",
      description:
        "Promote local small businesses that follow ethical and sustainable practices. Encourage the community to buy local and strengthen the local economy.",
      donateUrl: "https://example.com/donate-local",
    },
    {
      title: "Clean Streets, Strong Communities",
      description:
        "Organise community clean-up drives to reduce litter and improve public spaces. Share clean-up locations and invite volunteers to join.",
      donateUrl: "https://example.com/donate-cleanup",
    },
    {
      title: "Mental Health Matters",
      description:
        "Raise awareness about mental health and reduce stigma. Share wellbeing resources and promote support services and student-friendly initiatives.",
      donateUrl: "https://example.com/donate-mentalhealth",
    },
  ];

  for (const c of samples) {
    await addDoc(collection(db, "campaigns"), {
      title: c.title,
      description: c.description,
      donateUrl: c.donateUrl,
      imageUrl: "",
      createdBy: user.uid,
      createdByName: user.email || "Admin",
      createdAt: serverTimestamp(),
      status: "PENDING",
      reviewedBy: null,
      reviewedAt: null,
      reviewNote: "",
    });
  }
}
