'use client'

import { HeaderActions } from "./header-actions";
import { HeaderHomeLink } from "./header-home-link";

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
                    container mx-auto flex p-4
                    items-center justify-between
                "
            >
                <HeaderHomeLink />
                <HeaderActions />
            </div>
        </header>
    );
};
