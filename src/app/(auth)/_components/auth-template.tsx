'use client'

import { useSearchParams } from "next/navigation";
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
    const searchParams = useSearchParams();
    const authStep = searchParams.get('auth_step') ?? 'method';

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
