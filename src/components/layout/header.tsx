import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TopAssets } from "./top-assets";

export function Header() {
    return (
        <header
            className="
                flex sticky top-0 border-b h-auto items-center
                bg-background w-full z-[9999] py-4 px-32
                justify-between
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
                <Badge>
                    Demo
                </Badge>
            </div>
            <TopAssets />
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
        </header>
    );
};
