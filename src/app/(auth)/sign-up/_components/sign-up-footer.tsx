'use client'

import { useRouter } from "next/navigation";
import { AuthFooter } from "../../_components/auth-footer";

export function SignUpFooter() {
    const router = useRouter();

    return (
        <AuthFooter
            text="Already have an account?"
            link={
                <button
                    className="
                        font-semibold tracking-tight
                        hover:cursor-pointer
                    "
                    onClick={ () => router.replace('/login?auth_step=method') }
                    type="button"
                >
                    Log In
                </button>
            }
        />
    );
};
