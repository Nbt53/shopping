import { db } from "../configs/firebase";
import { ref } from "vue";
import { deleteDoc, doc } from "firebase/firestore";

const deleteDocument = async (collection: string, id: string) => {
    const error: any | null = ref(null);
    const message: any | null = ref(null);
    try {
        await deleteDoc(doc(db, collection, id));
        message.value = 'Document deleted successfully';
        error.value = null;
    } catch (err: any) {
        message.value = null;
        console.error(err.message);
    }
    return { error, message };
}

export default deleteDocument