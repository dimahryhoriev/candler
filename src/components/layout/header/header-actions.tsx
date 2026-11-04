'use client'

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/lib/api/supabase/session/use-sign-out";
import { useAuthStore } from "@/store/use-auth-store";
import Link from "next/link";
import { useEffect } from "react";

export function HeaderActions() {
    const { handleSignOut } = useSignOut();
    const user = useAuthStore(state => state.user);
    const init = useAuthStore(state => state.init);

    useEffect(() => {
        const unsubscribe = init();
        return () => unsubscribe();
    }, [init]);

    return (
        <div
            className="
                flex justify-between gap-2
            "
        >
            {
                !user
                    ? (
                        <>
                            <Button
                                key="login-btn"
                                size="lg"
                                variant="light-blue"
                                className="flex-1 w-32"
                                asChild
                            >
                                <Link
                                    href="/login"
                                >
                                    Log In
                                </Link>
                            </Button>
                            < Button
                                key="sign-up-btn"
                                size="lg"
                                variant="blue"
                                className="flex-1 w-32"
                                asChild
                            >
                                <Link
                                    href="/sign-up"
                                >
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                    )
                    : (
                        <Button
                            key="sign-out-btn"
                            size="lg"
                            variant="light-blue"
                            className="flex-1 w-32"
                            onClick={ handleSignOut }
                        >
                            Sign Out
                        </Button>
                    )
            }
        </div >
    );
};
