import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  User 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc 
} from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";

interface UserProfile {
  id: string;
  username: string | null;
  interests: string[] | null;
  communities: string[] | null;
  joined_at: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  signUp: (email: string, password: string, username: string, interests: string[]) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  loading: boolean;
  logActivity: (action: string, details?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const docRef = doc(db, "profiles", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  const createProfile = async (userId: string, username: string, interests: string[]) => {
    try {
      const profileData: UserProfile = {
        id: userId,
        username,
        interests,
        communities: [],
        joined_at: new Date().toISOString()
      };
      await setDoc(doc(db, "profiles", userId), profileData);
      return profileData;
    } catch (error) {
      console.error("Error creating profile:", error);
      return null;
    }
  };

  const logActivity = async (action: string, details?: any) => {
    if (!user) return;
    try {
      const activitiesRef = collection(db, "user_activities");
      await addDoc(activitiesRef, {
        user_id: user.uid,
        action,
        details: details || null,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        let profileData = await fetchProfile(firebaseUser.uid);
        if (!profileData) {
          const defaultUsername = firebaseUser.email?.split("@")[0] || "User";
          profileData = await createProfile(firebaseUser.uid, defaultUsername, []);
        }
        setProfile(profileData);
        await logActivity("login", { email: firebaseUser.email });
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string, interests: string[]) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      if (firebaseUser) {
        const profileData = await createProfile(firebaseUser.uid, username, interests);
        setProfile(profileData);
        await logActivity("signup", { email, username, interests });
      }
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        await logActivity("logout", { email: user.email });
      }
      await firebaseSignOut(auth);
      setProfile(null);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: { message: "No user logged in" } };
    }
    try {
      const docRef = doc(db, "profiles", user.uid);
      await updateDoc(docRef, updates);
      const updatedProfile = await fetchProfile(user.uid);
      setProfile(updatedProfile);
      await logActivity("profile_update", { updates });
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const value = {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    loading,
    logActivity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
