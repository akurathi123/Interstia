import { db } from "./client";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

// --- Community helpers ---

export async function getCommunities() {
  try {
    const communitiesRef = collection(db, "communities");
    const q = query(communitiesRef, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createCommunity({ name, description, creatorId }) {
  try {
    const docRef = await addDoc(collection(db, "communities"), {
      name,
      description,
      creator: creatorId,
      created_at: new Date().toISOString(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { ...docSnap.data(), id: docSnap.id }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getCommunityById(id) {
  try {
    const docRef = doc(db, "communities", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return { data: null, error: new Error("Not found") };
    return { data: { ...docSnap.data(), id: docSnap.id }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// --- Chat helpers ---

export async function getCommunityMessages(communityId) {
  try {
    const messagesRef = collection(db, "community_chats");
    const q = query(
      messagesRef,
      where("community_id", "==", communityId),
      orderBy("sent_at", "asc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function sendCommunityMessage({ communityId, senderId, message }) {
  try {
    const docRef = await addDoc(collection(db, "community_chats"), {
      community_id: communityId,
      sender: senderId,
      message,
      sent_at: new Date().toISOString(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { ...docSnap.data(), id: docSnap.id }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
