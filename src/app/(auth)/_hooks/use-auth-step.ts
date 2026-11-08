'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type AuthStep = 'method' | 'email' | 'pass-recovery';
export type AuthPathname = '/login' | '/sign-up' | '/reset-password';

const validSteps: AuthStep[] = ['method', 'email', 'pass-recovery'];

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
    const defaultStep: AuthStep =
        pathname === '/reset-password'
            ? 'pass-recovery'
            : 'method';

    const authStep: AuthStep = isValidStep(stepParam)
        ? stepParam
        : defaultStep

    const changeAuthStep = (
        stepToChange: AuthStep,
        pathnameToChange?: AuthPathname,
    ) => {
        const path = pathnameToChange ?? pathname;

        if (
            stepToChange === 'method'
            ||
            stepToChange === 'pass-recovery'
        ) {
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

const isValidStep = (
    step: string | null,
): step is AuthStep => (
    Boolean(step && validSteps.includes(step as AuthStep))
);
