import { db } from "@/configs/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";

const updateDocument = async (collection: string, id: string, data: any) => {
    const error: any | null = ref(null);
    const message: any | null = ref(null);
    try {
        await updateDoc(doc(db, collection, id), data);
        message.value = 'Document updated successfully';
    } catch (err: any) {
        message.value = null;
        error.value = err.message;
        console.error(err.message);
    }

    return { error, message };
}

export default updateDocument