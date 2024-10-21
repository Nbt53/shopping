import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { auth } from "../../configs/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore"; // Import Firestore functions

const db = getFirestore(); // Initialize Firestore
const user = ref(null); // Initialize user ref

onAuthStateChanged(auth, async (u) => {
    if (u) {
        const userDocRef = doc(db, "users", u.uid); // Reference to the user document in Firestore
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            user.value = userDoc.data(); // Set the user ref to the document data
        } else {
            console.log("No such document!");
            user.value = null;
        }
    } else {
        user.value = null; // No user is signed in
    }
});

const getUser = () => {
    return { user }
}

export default getUser;