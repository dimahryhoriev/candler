import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";

export function useSignOut() {
    const router = useRouter();
    const signOut = useAuthStore(state => state.signOut);
    const handleSignOut = async () => {
        await signOut();
        router.refresh();
        router.push('/login');
    };

    return {
        handleSignOut
    };
};
