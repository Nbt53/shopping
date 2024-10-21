import { signOut } from "firebase/auth";

import { ref } from "vue";
import { auth } from "../../configs/firebase";

const error: any = ref(null);

const logout = async () => {
    error.value = null;
    try {
        await signOut(auth);
        return { success: true };
    } catch (err) {
        error.value = (err as Error).message;
        return { success: false, error };
    }
}

const useLogout = () => {
    return { logout, error };
}

export default useLogout;