'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AreaChart, ChevronDown, Coins } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
    { href: '/markets/coins', label: 'Coins', icon: <Coins className="!size-5" /> },
    { href: '/markets/charts', label: 'Charts', icon: <AreaChart className="!size-5" /> },
];

export function MarketsSectionSelector() {
    const pathname = usePathname();
    const currentSection = sections.find(
        s => pathname.startsWith(s.href)
    ) ?? sections[0];

    return (
        <div
            className="
                flex flex-col w-fit self-center
                items-center gap-2
            "
        >
            <h1 className="w-fit text-xl font-medium">
                Markets
            </h1>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="
                        flex items-center p-2 rounded-xl
                        hover:bg-muted duration-200
                        outline-none ring-0
                    "
                >
                    <h2
                        className="text-4xl font-bold"
                    >
                        { currentSection.label }
                    </h2>
                    <ChevronDown
                        className="pt-2"
                        size={ 40 }
                        strokeWidth={ 3 }
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="flex flex-col gap-1"
                    align="center"
                >
                    {
                        sections.map(
                            (s, i) => (
                                <DropdownMenuItem
                                    className={
                                        cn(
                                            'p-2',
                                            pathname === s.href
                                            && `bg-foreground text-background
                                                focus:bg-foreground focus:text-background
                                                [&_svg]:!text-background [&_svg]:!stroke-background`
                                        )
                                    }
                                    key={ i }
                                    asChild
                                >
                                    <Link href={ s.href }>
                                        { s.icon }
                                        { s.label }
                                    </Link>
                                </DropdownMenuItem>
                            )
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
