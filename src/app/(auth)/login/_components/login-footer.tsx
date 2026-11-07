'use client'

import { useRouter } from "next/navigation";
import { AuthFooter } from "../../_components/auth-footer";

export function LoginFooter() {
    const router = useRouter();

    return (
        <AuthFooter
            text="Don't have an account?"
            link={
                <button
                    className="
                        font-semibold tracking-tight
                        hover:cursor-pointer
                    "
                    onClick={ () => router.replace('/sign-up?auth_step=method') }
                    type="button"
                >
                    Sign Up
                </button>
            }
        />
    );
};
