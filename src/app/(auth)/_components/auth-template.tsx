'use client'

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AuthFooter } from "./auth-footer";
import { AuthHeader } from "./auth-header";
import { AuthMethodSelector } from "./auth-method-selector";

export type AuthMode = 'login' | 'sign-up';

export type AuthStep = 'method' | 'form';
export type AuthStepSetter = Dispatch<SetStateAction<AuthStep>>;

export function AuthTemplate({
    mode,
    form,
}: {
    mode: AuthMode;
    form: React.ReactNode;
}) {
    const [authStep, setAuthStep] = useState<AuthStep>('method');

    const CTA = mode === 'login' ? 'Log In' : 'Sign Up';
    const alternativeCTA = mode === 'login' ? 'Sign Up' : 'Log In';
    const alternativeHref = mode === 'login' ? '/sign-up' : '/login';

    return (
        <>
            <AuthHeader
                authStep={ authStep }
                authStepSetter={ setAuthStep }
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
                    { CTA }
                </span>
                {
                    authStep === 'method'
                        ? (
                            <AuthMethodSelector
                                onHandleForm={ setAuthStep }
                            />
                        )
                        : form
                }
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
