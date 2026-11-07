'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type AuthStep = 'method' | 'email';
export type AuthPathname = '/login' | '/sign-up';

type UseAuthStepReturn = {
    authStep: AuthStep;
    changeAuthStep: (
        stepToChange: AuthStep,
        pathnameToChange?: AuthPathname,
    ) => void;
};

export function useAuthStep(): UseAuthStepReturn {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const stepParam = params.get('auth_step');
    const authStep = stepParam === 'email' ? 'email' : 'method';

    const changeAuthStep = (
        stepToChange: AuthStep,
        pathnameToChange?: AuthPathname,
    ) => {
        const path = pathnameToChange ?? pathname;

        if (stepToChange === 'method') {
            router.replace(path);
            return;
        };

        router.replace(`${path}?auth_step=${stepToChange}`);
    };

    return {
        authStep,
        changeAuthStep,
    };
};
