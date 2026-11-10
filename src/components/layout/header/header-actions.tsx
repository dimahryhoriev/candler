import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/api/supabase/session/sign-out/sign-out";
import { getUser } from "@/lib/api/supabase/session/user/get-user";
import Link from "next/link";

export async function HeaderActions() {
    const user = await getUser();

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
                        <form action={ signOut }>
                            <Button
                                size="lg"
                                variant="light-blue"
                                className="flex-1 w-32"
                            >
                                Sign Out
                            </Button>
                        </form>
                    )
            }
        </div >
    );
};
