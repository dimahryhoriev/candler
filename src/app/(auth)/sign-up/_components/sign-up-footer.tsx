'use client'

import { AuthFooter } from "../../_components/auth-footer";
import { useAuthStep } from "../../_hooks/use-auth-step";

export function SignUpFooter() {
    const { authStep, changeAuthStep } = useAuthStep();
    console.log(authStep)

    const goToLogin = () => {
        switch (authStep) {
            case 'email': changeAuthStep('email', '/login')
                break;
            case 'method': changeAuthStep('method', '/login')
                break;
            default: changeAuthStep('method', '/login');
        };
    };

    return (
        <AuthFooter
            text="Already have an account?"
            link={
                <button
                    className="
                        font-semibold tracking-tight
                        hover:cursor-pointer
                    "
                    onClick={ goToLogin }
                    type="button"
                >
                    Log In
                </button>
            }
        />
    );
};
