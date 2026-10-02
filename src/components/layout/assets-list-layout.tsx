'use client';

import Link from "next/link";
import { AssetsListViewMode } from "./assets-list";

export function AssetsListLayout({
    title,
    mode = 'cards',
    children,
}: {
    title: string;
    mode: AssetsListViewMode;
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                flex flex-col gap-6 w-full
            "
        >
            <Link
                href="markets"
                className="
                        text-xl font-medium w-fit
                        hover:text-blue-600
                        transition-colors duration-100
                    "
            >
                { `${title} >` }
            </Link>
            {
                mode === 'cards'
                    ? (
                        <AssetsListLayoutCards>
                            { children }
                        </AssetsListLayoutCards>
                    )
                    : (
                        <AssetsListLayoutRows>
                            { children }
                        </AssetsListLayoutRows>
                    )
            }
        </div>
    );
};

export function AssetsListLayoutCards({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                items-center text-xs gap-6
                grid grid-rows-4 grid-cols-1
                md:grid-cols-2 md:grid-rows-2
                lg:grid-cols-4 lg:grid-rows-1
            "
        >
            {
                children
            }
        </div>
    );
};

export function AssetsListLayoutRows({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                flex flex-col w-full gap-1.5
            "
        >
            {
                children
            }
        </div>
    );
};
