import { capitalizeString } from "@/lib/format";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export function AppBreadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">
                            Home
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {
                    segments.map(
                        (s, i) => {
                            const href = `/${segments.slice(0, i + 1).join('/')}`;
                            const isLast = i === segments.length - 1;
                            const label = capitalizeString(s);

                            return (
                                <React.Fragment key={ i }>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {
                                            isLast || (s === 'markets' && segments.includes('coins'))
                                                ? (
                                                    <BreadcrumbPage>
                                                        { label }
                                                    </BreadcrumbPage>
                                                )
                                                : (
                                                    <BreadcrumbLink asChild>
                                                        <Link href={ href }>
                                                            { label }
                                                        </Link>
                                                    </BreadcrumbLink>
                                                )
                                        }
                                    </BreadcrumbItem>
                                </React.Fragment>
                            );
                        }
                    )
                }
            </BreadcrumbList >
        </Breadcrumb >
    )
};
