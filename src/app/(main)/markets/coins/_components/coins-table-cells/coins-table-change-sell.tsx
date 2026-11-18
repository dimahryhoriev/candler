import { TableCell } from "@/components/ui/table";
import { TimeframeKey } from "@/lib/charts/timeframes";
import { formatChange } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useTimeframesChangesStore } from "@/store/use-timeframes-changes-store";

export function CoinsTableChangeCell({
    symbol,
    timeframeKey,
}: {
    symbol?: string;
    timeframeKey: TimeframeKey;
}) {
    const change = useTimeframesChangesStore((state) => (
        symbol
            ? state.changes[symbol]?.[timeframeKey]
            : undefined
    ));

    if (change === undefined) {
        return (
            <TableCell className="text-muted-foreground">
                --
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
