import { auth } from '@/configs/firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore'; // Correctly import Firestore functions
import { timestamp } from '../../configs/firebase';

export const useLogin = () => {
  const loginWithGoogle = async () => {
    console.log('Logging in with Google');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        const db = getFirestore();
        const userDocRef = doc(db, `users/${user.uid}`); // Correct path for Firestore document

        // Check if the user already exists
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid || null,
            email: user.email || null,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
            createdAt: timestamp(), // Ensure timestamp() returns a Firestore-compatible value
          });
        }

        // Handle result, e.g., redirect or update UI
        return result;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { loginWithGoogle, handleRedirectResult };
};