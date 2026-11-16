'use client'

import { Table } from "@/components/ui/table";
import { useAssets } from "@/hooks/use-assets";
import { useState } from "react";
import { CoinsTableBody } from "./coins-table-body";
import { CoinsTableHeader } from "./coins-table-header";
import { CoinsTableTabs } from "./coins-table-tabs";

export type Tab = 'overview' | 'performance' | 'futures';

export function CoinsTable() {
    const [tab, setTab] = useState<Tab>('overview');
    const { assets } = useAssets();

    return (
        <div className="flex flex-col gap-3 w-full overflow-x-auto">
            <CoinsTableTabs onTabChange={ setTab } />
            <Table className="min-w-full">
                <CoinsTableHeader tab={ tab } />
                <CoinsTableBody assets={ assets } />
            </Table>
        </div>
    );
};
