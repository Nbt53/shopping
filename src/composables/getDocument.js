import { ref } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

const getDocument = async (collection, id) => {
    const documentData = ref(null);
    const error = ref(null);

    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        documentData.value = docSnap.data();

    } else {
        error.value = 'Document does not exist';
    }

    return { documentData, error };
}

export default getDocument;