import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/firebase';

// Initialize a ref to hold the user's login state
const isLoggedIn = ref(false);

// Listen for changes in the authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    isLoggedIn.value = true;
  } else {
    // User is signed out
    isLoggedIn.value = false;
  }
});

export default function useIsLoggedIn() {
  return { isLoggedIn };
}