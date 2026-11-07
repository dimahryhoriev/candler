'use client'

import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function AuthHeader({
    description,
}: {
    description: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const authStep = searchParams.get('auth_step') ?? 'method';

    return (
        <div
            className="
                flex w-full h-fit relative
                justify-center items-center
            "
        >
            {
                <ArrowLeft
                    className="
                        text-foreground absolute left-0 top-0 w-7 h-7
                        transition-all duration-150 hover:scale-105
                        hover:bg-black/5 rounded overflow-hidden
                        hover:text-muted-foreground cursor-pointer
                    "
                    onClick={
                        authStep === 'method'
                            ? () => router.replace('/')
                            : () => router.replace(`${pathname}?auth_step=method`)
                    }
                />
            }
            <div
                className="flex flex-col items-center"
            >
                <Link
                    href='/'
                    className="
                        font-bold text-xl tracking-tight
                    "
                >
                    Candler
                </Link>
                <span
                    className="text-[12px] font-medium text-muted-foreground"
                >
                    { description }
                </span>
            </div>
            <Link
                href='/'
            >
                <X
                    className="
                        text-foreground absolute right-0 top-0 w-7 h-7
                        transition-all duration-150 hover:scale-105
                        hover:bg-black/5 rounded overflow-hidden
                        hover:text-muted-foreground
                    "
                />
            </Link>
        </div>
    );
};
