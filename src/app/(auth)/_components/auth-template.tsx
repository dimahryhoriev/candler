import { AuthDivider } from "./auth-divider";
import { AuthEmailButton } from "./auth-email-button";
import { AuthGoogleButton } from "./auth-google-button";
import { AuthHeader } from "./auth-header";

type AuthMode = 'login' | 'sign-up';

export function AuthTemplate({
    mode,
}: {
    mode: AuthMode;
}) {
    const CTA = mode === 'login' ? 'Log In' : 'Sign Up';
    const alternativeCTA = mode === 'login' ? 'Sign Up' : 'Log In';

    return (
        <>
            <AuthHeader
                description="Crypto Tracker"
            />
            <div
                className="
                    flex flex-col gap-8 items-center
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
        </>
    );
};
