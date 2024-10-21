import { ref, watchEffect } from "vue"
import { query, orderBy, onSnapshot, collection } from 'firebase/firestore';
import { db } from "../configs/firebase";


const getCollection = (collectionName) => {
    const error = ref(null);
    const documents = ref(null);
    let collectionRef = collection(db, collectionName);
    let queryRef = query(collectionRef, orderBy('createdAt', 'asc'));

    const unSub = onSnapshot(queryRef, (snap) => {
        let results = [];
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