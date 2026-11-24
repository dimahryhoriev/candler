'use client'

import { Button } from "@/components/ui/button";
import { EdgeFade } from "@/components/ui/edge-fade";
import { Table } from "@/components/ui/table";
import { useAssets } from "@/hooks/use-assets";
import { useScroll } from "@/hooks/use-scroll";
import { getAssetsSymbols } from "@/lib/assets/assets-unpackers";
import { useMemo, useRef, useState } from "react";
import { CoinsTableBody } from "./coins-table-body";
import { CoinsTableHeader } from "./coins-table-header";
import { CoinsTableTabs } from "./coins-table-tabs";

export type Tab = 'overview' | 'performance' | 'futures';

export function CoinsTable() {
    const [tab, setTab] = useState<Tab>('overview');
    const [limit, setLimit] = useState<number>(12);

    const containerRef = useRef<HTMLDivElement>(null);
    const { assets } = useAssets({
        limit,
        typeOptions: {
            stables: true,
            majors: true,
            altcoins: true,
        },
    });

    const { scrollState, updateScrollState } = useScroll<HTMLDivElement>(
        containerRef,
        `${tab}-${assets.length}`,
    );

    const symbols = useMemo(() => getAssetsSymbols(assets), [assets]);

    return (
        <div className="flex flex-col gap-10 w-full">
            <div
                className="flex flex-col relative w-full gap-3"
            >
                <CoinsTableTabs onTabChange={ setTab } />
                <div
                    className="overflow-x-auto w-full"
                    onScroll={ updateScrollState }
                    ref={ containerRef }
                >
                    <Table
                        data-scrolled-x={ scrollState.isScrolled.x }
                        data-scrolled-y={ scrollState.isScrolled.y }
                        className="
                        min-w-full border-separate border-spacing-0
                        [&_td]:border-b [&_th]:border-b group/table
                    "
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
                <EdgeFade side="right" isVisible={ scrollState.canScroll.x } />
                <EdgeFade side="bottom" isVisible={ scrollState.canScroll.y } />
            </div>
            <Button
                variant="outline"
                size="2xl"
                onClick={ () => setLimit(limit => limit + 12) }
            >
                Load More
            </Button>
        </div >
    );
};
