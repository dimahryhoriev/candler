import { TableCell } from "@/components/ui/table";
import { TimeframeKey } from "@/lib/charts/timeframes";
import { formatChange } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useTimeframesChangesStore } from "@/store/use-timeframes-changes-store";
import { CoinsTableMarket } from "../coins-table";
import { markets } from "../coins-table.config";

export function CoinsTableChangeCell({
    symbol,
    timeframeKey,
    market,
}: {
    symbol: string | undefined;
    timeframeKey: TimeframeKey;
    market?: CoinsTableMarket;
}) {
    const dynamicChange = (symbol && market)
        ? markets[market].useChange(symbol)
        : undefined;

    const staticChange = useTimeframesChangesStore(s => (
        symbol
            ? s.changes[symbol]?.[timeframeKey]
            : undefined
    ));

    const change = timeframeKey === '1D'
        ? dynamicChange
        : staticChange

    if (change === undefined) {
        return (
            <TableCell
                className="text-muted-foreground"
            >
                0.00%
            </TableCell>
        );
    };

    const isPositive = change > 0;
    const isZero = change === 0;

    return (
        <TableCell
            className={
                cn(
                    "font-mono font-medium",
                    isZero && "text-muted-foreground",
                    isPositive ? "text-emerald-500" : "text-rose-500",
                )
            }
        >
            { formatChange(change) }
        </TableCell>
    );
};
