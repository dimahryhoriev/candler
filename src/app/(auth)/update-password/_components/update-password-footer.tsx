'use client'

import { AuthFooter } from "../../_components/auth-footer";
import { useAuthStep } from "../../_hooks/use-auth-step";

export function UpdatePasswordFooter() {
    const { changeAuthStep } = useAuthStep();

    const goToLogin = () => { changeAuthStep('method', '/login') };

    return (
        <AuthFooter
            text="Remember your password?"
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
