'use client'

import { useAuthStep } from "../_hooks/use-auth-step";
import { AuthHeader } from "./auth-header";
import { AuthMethodSelector } from "./auth-method-selector";

export function AuthTemplate({
    title,
    form,
    footer,
}: {
    title: string;
    form: React.ReactNode;
    footer: React.ReactNode;
}) {
    const { authStep } = useAuthStep();

    return (
        <>
            <AuthHeader
                description="Crypto Tracker"
            />
            <div
                className="
                    flex flex-col gap-8 items-center
                    relative -top-10 w-fit
                "
            >
                <span
                    className="
                        font-semibold text-2xl tracking-tight
                    "
                >
                    { title }
                </span>
                {
                    authStep === 'method'
                        ? <AuthMethodSelector />
                        : form
                }
            </div>
            { footer }
        </>
    );
};
