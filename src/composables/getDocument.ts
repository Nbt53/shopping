import { ref } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

const getDocument = async (collectionName: string, id: string) => {
    const documentData: any = ref<any | null>(null);
    const error = ref<string | null>(null);
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            documentData.value = docSnap.data();
        } else {
            error.value = 'document does not exist';
        }
    } catch (err: any) {
        console.error(err.message);
        error.value = 'could not fetch data';
    }

    return { documentData, error };
}

export default getDocument;