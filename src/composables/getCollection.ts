import { ref, watchEffect } from "vue"
import { query, orderBy, onSnapshot, collection } from 'firebase/firestore';
import { db } from "../configs/firebase";


const getCollection = (collectionName: string) => {
    const error = ref<string | null>(null);
    const documents = ref<any[] | null>(null);
    const collectionRef = collection(db, collectionName);
    const queryRef = query(collectionRef, orderBy('createdAt', 'asc'));

    const unSub = onSnapshot(queryRef, (snap) => {
        const results: any[] = [];
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        });
        documents.value = results;
        error.value = null;
    }, (err) => {
        console.log(err.message);
        documents.value = null;
        error.value = 'could not fetch data';
    });
    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unSub());
    })
    return { error, documents };
}

export default getCollection