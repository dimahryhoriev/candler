import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTickersStore } from "@/store/use-tickers-store";
import { Tab } from "./coins-table";
import { tabColumns } from "./coins-table.config";

export function CoinsTableHeader({
    tab,
}: {
    tab: Tab;
}) {
    const assetsCount = useTickersStore(s => s.totalCount);

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
