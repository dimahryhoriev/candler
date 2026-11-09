import { useRouter } from "next/navigation";
import { AuthStep, useAuthStep } from "./use-auth-step";

export function useAuthGoBack(
    step: AuthStep,
) {
    const router = useRouter();
    const { changeAuthStep } = useAuthStep();

    const goBack = () => {
        switch (step) {
            case 'email': changeAuthStep('method')
                break;
            case 'pass-recovery': changeAuthStep('method', '/login')
                break;
            case 'method': router.replace('/')
                break;
            default: changeAuthStep('method', '/login');
        };
    };

    return goBack;
};
