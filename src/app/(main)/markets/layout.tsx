'use client'

import { AppBreadcrumbs } from "@/components/layout/app-breadcrumbs";
import { MarketsSectionSelector } from "./_components/markets-section-selector";

export default function MarketsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                flex flex-col w-full gap-6
            "
        >
            <AppBreadcrumbs />
            <MarketsSectionSelector />
            { children }
        </div>
    );
};
