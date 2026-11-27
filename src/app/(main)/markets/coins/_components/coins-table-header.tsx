import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CoinsTableMarket, CoinsTableTab } from "./coins-table";
import { markets, tabColumns } from "./coins-table.config";

export function CoinsTableHeader({
    tab,
    market,
}: {
    tab: CoinsTableTab;
    market: CoinsTableMarket;
}) {
    const assetsCount = markets[market].useTotalCount();

    return (
        <TableHeader>
            <TableRow>
                {
                    tabColumns[tab].map((tc) => (
                        <TableHead
                            key={ tc.key }
                            className={
                                cn(
                                    'hover:bg-muted font-normal bg-background',
                                    'transition-all duration-200 border-t border-border',
                                    'text-[13px] text-zinc-500 px-4',
                                    tc.key === 'asset' && [
                                        'group-data-[scrolled-x=true]/table:shadow-md',
                                        'sticky left-0',
                                    ],
                                )
                            }
                        >
                            <div
                                className={
                                    cn(
                                        'flex items-center gap-1 justify-end',
                                        tc.key === 'asset' && 'justify-start',
                                        tc.key === 'rank' && 'justify-center w-20',
                                    )
                                }
                            >
                                { tc.icon }
                                { tc.label }
                                {
                                    tc.key === 'asset' && (
                                        <span className="text-foreground">
                                            { ` (${assetsCount})` }
                                        </span>
                                    )
                                }
                            </div>
                        </TableHead>
                    ))
                }
            </TableRow>
        </TableHeader>
    );
};
