import { X } from "lucide-react";
import Link from "next/link";

export function AuthHeader({
    description,
}: {
    description: string;
}) {
    return (
        <div
            className="
                flex w-full h-fit relative
                justify-center items-center
            "
        >
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
