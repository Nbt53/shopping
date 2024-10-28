import { ref } from "vue"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/firebase";


const useCollection = (document: any ) => {
    const error: any  = ref(null)

    const addDocToFirebase = async (doc: any) => {
        error.value = null
        try {
            await addDoc(collection(db, document), doc)
        } catch (err: any) {
            console.error(err.message)
            error.value = "could not send the message"
        }
    }
    return { error, addDocToFirebase }
}

export default useCollection