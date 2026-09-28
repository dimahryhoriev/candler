import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
    return (
        <header
            className="
                sticky top-0 border-b w-full
                bg-background z-[9999]
            "
        >
            <div
                className="
                    container mx-auto flex p-4 h-auto
                    h-10 items-center justify-between
                "
            >
                <div
                    className="flex gap-1.5"
                >
                    <Link
                        href='/'
                        className="
                        font-bold text-xl tracking-tight
                    "
                    >
                        <span>
                            Candler
                        </span>
                    </Link>
                </div>
                <div
                    className="
                    flex w-64 justify-between gap-2
                "
                >
                    <Button
                        size="lg"
                        variant="light-blue"
                        className="flex-1"
                    >
                        Log In
                    </Button>
                    <Button
                        size="lg"
                        variant="blue"
                        className="flex-1"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
};
