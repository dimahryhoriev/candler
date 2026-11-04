import Link from "next/link";
import { AuthDivider } from "./auth-divider";
import { AuthEmailButton } from "./auth-email-button";
import { AuthFooter } from "./auth-footer";
import { AuthGoogleButton } from "./auth-google-button";
import { AuthHeader } from "./auth-header";

export type AuthMode = 'login' | 'sign-up';

export function AuthTemplate({
    mode,
}: {
    mode: AuthMode;
}) {
    const CTA = mode === 'login' ? 'Log In' : 'Sign Up';
    const alternativeCTA = mode === 'login' ? 'Sign Up' : 'Log In';
    const alternativeHref = mode === 'login' ? '/sign-up' : '/login';

    return (
        <>
            <AuthHeader
                description="Crypto Tracker"
            />
            <div
                className="
                    flex flex-col gap-8 items-center
                    relative -top-10
                "
            >
                <span
                    className="
                        font-semibold text-2xl tracking-tight
                    "
                >
                    { CTA }
                </span>
                <div
                    className="
                        flex flex-col w-80 gap-4
                    "
                >
                    <AuthGoogleButton />
                    <AuthDivider />
                    <AuthEmailButton />
                </div>
            </div>
            <AuthFooter
                mode={ mode }
                link={
                    <Link
                        href={ alternativeHref }
                        className="
                            font-semibold tracking-tight
                        "
                    >
                        { alternativeCTA }
                    </Link>
                }
            />
        </>
    );
};
