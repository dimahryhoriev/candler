import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { HeaderActions } from "./header-actions";
import { HeaderHomeLink } from "./header-home-link";
import { HeaderNavbar } from "./header-navbar";

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
                    container mx-auto flex px-4 py-3
                    items-center justify-between
                "
            >
                <HeaderHomeLink />
                <HeaderNavbar />
                <Suspense
                    fallback={
                        <Skeleton
                            className="w-32 h-9"
                        />
                    }
                >
                    <HeaderActions />
                </Suspense>
            </div>
        </header>
    );
};
