'use client'

import { Button } from "@/components/ui/button";
import { EdgeFade } from "@/components/ui/edge-fade";
import { Table } from "@/components/ui/table";
import { useScroll } from "@/hooks/use-scroll";
import { useRef, useState } from "react";
import { CoinsTableContentFutures } from "./coins-table-content-futures";
import { CoinsTableContentSpot } from "./coins-table-content-spot";
import { CoinsTableHeader } from "./coins-table-header";
import { CoinsTableTabs } from "./coins-table-tabs";

export type CoinsTableTab = 'overview' | 'performance' | 'futures';
export type CoinsTableMarket = 'futures' | 'spot';

export function CoinsTable() {
    const [tab, setTab] = useState<CoinsTableTab>('overview');
    const [limit, setLimit] = useState<number>(12);

    const containerRef = useRef<HTMLDivElement>(null);

    const market: CoinsTableMarket = tab === 'futures'
        ? 'futures'
        : 'spot';

    const { scrollState, updateScrollState } = useScroll<HTMLDivElement>(
        containerRef,
        `${tab}-${limit}`,
    );

    return (
        <div className="flex flex-col gap-3 w-full">
            <CoinsTableTabs onTabChange={ setTab } />
            <div
                className="flex flex-col w-full gap-3 relative"
            >
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
                            market={ market }
                        />
                        {
                            tab === 'futures'
                                ? (
                                    <CoinsTableContentFutures
                                        limit={ limit }
                                        tab={ tab }
                                    />
                                )
                                : (
                                    <CoinsTableContentSpot
                                        limit={ limit }
                                        tab={ tab }
                                    />
                                )
                        }
                    </Table>
                    <EdgeFade side="right" isVisible={ scrollState.canScroll.x } />
                    <EdgeFade side="bottom" isVisible={ scrollState.canScroll.y } />
                </div>
            </div>
            <Button
                className="mt-7"
                variant="outline"
                size="2xl"
                onClick={ () => setLimit(limit => limit + 12) }
            >
                Load More
            </Button>
        </div >
    );
};
