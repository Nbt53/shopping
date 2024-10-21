import { db } from "../configs/firebase";
import { ref } from "vue";
import { deleteDoc, doc } from "firebase/firestore";

const deleteDocument = async (collection, id) => {
    const error = ref(null);
    const message = ref(null);
    try {
        await deleteDoc(doc(db, collection, id));
        message.value = 'Document deleted successfully';
        error.value = null;
    } catch (err) {
        message.value = null;
        console.error(err.message);
    }
    return { error, message };
}

export default deleteDocument