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
    const { assets } = useAssets({ limit: 12 });
    const symbols = useMemo(() => getAssetsSymbols(assets), [assets]);

    return (
        <div className="flex flex-col gap-3 w-full overflow-x-auto">
            <CoinsTableTabs onTabChange={ setTab } />
            <Table className="min-w-full">
                <CoinsTableHeader tab={ tab } />
                <CoinsTableBody
                    assets={ assets }
                    symbols={ symbols }
                    tab={ tab }
                />
            </Table>
        </div>
    );
};
