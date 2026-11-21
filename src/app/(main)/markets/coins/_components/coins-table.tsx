'use client'

import { Table } from "@/components/ui/table";
import { useAssets } from "@/hooks/use-assets";
import { getAssetsSymbols } from "@/lib/assets/assets-unpackers";
import { useMemo, useState } from "react";
import { CoinsTableBody } from "./coins-table-body";
import { CoinsTableHeader } from "./coins-table-header";
import { CoinsTableTabs } from "./coins-table-tabs";

export type Tab = 'overview' | 'performance' | 'futures';

export function CoinsTable() {
    const [tab, setTab] = useState<Tab>('overview');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const { assets } = useAssets({
        limit: 12,
        typeOptions: {
            stables: true,
            majors: true,
            altcoins: true,
        },
    });

    const symbols = useMemo(() => getAssetsSymbols(assets), [assets]);

    return (
        <div className="flex flex-col gap-3 w-full">
            <CoinsTableTabs onTabChange={ setTab } />
            <div
                className="overflow-x-auto w-full"
                onScroll={ e => setIsScrolled(e.currentTarget.scrollLeft > 0) }
            >
                <Table
                    className="
                        min-w-full border-separate border-spacing-0
                        [&_td]:border-b [&_th]:border-b group/table
                    "
                    data-scrolled={ isScrolled }
                >
                    <CoinsTableHeader
                        tab={ tab }
                    />
                    <CoinsTableBody
                        assets={ assets }
                        symbols={ symbols }
                        tab={ tab }
                    />
                </Table>
            </div>
        </div >
    );
};
