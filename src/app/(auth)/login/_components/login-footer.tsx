'use client'

import { AuthFooter } from "../../_components/auth-footer";
import { useAuthStep } from "../../_hooks/use-auth-step";

export function LoginFooter() {
    const { authStep, changeAuthStep } = useAuthStep();

    const goToSignUp = () => {
        switch (authStep) {
            case 'email': changeAuthStep('email', '/sign-up')
                break;
            case 'method': changeAuthStep('method', '/sign-up')
                break;
            default: changeAuthStep('method', '/sign-up');
        };
    };

    return (
        <AuthFooter
            text="Don't have an account?"
            link={
                <button
                    className="
                        font-semibold tracking-tight
                        hover:cursor-pointer
                    "
                    onClick={ goToSignUp }
                    type="button"
                >
                    Sign Up
                </button>
            }
        />
    );
};
