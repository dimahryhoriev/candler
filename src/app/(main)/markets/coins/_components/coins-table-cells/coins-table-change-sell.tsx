import { TableCell } from "@/components/ui/table";
import { TimeframeKey } from "@/lib/charts/timeframes";
import { formatChange } from "@/lib/format";
import { calculateChangePercent } from "@/lib/math/change";
import { cn } from "@/lib/utils";
import { useTickersStore } from "@/store/use-tickers-store";
import { useTimeframesChangesStore } from "@/store/use-timeframes-changes-store";

export function CoinsTableChangeCell({
    symbol,
    timeframeKey,
}: {
    symbol: string | undefined;
    timeframeKey: TimeframeKey;
}) {
    const ticker = useTickersStore(s => (
        symbol ? s.tickers[symbol] : undefined
    ));

    const dynamicChange = (ticker?.c && ticker?.o)
        ? calculateChangePercent({
            openValue: Number(ticker?.o),
            closeValue: Number(ticker?.c),
        })
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
            <TableCell className="text-muted-foreground">
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
