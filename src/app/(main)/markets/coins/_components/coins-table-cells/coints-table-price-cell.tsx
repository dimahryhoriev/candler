import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { useSpotTickersStore } from "@/store/use-spot-tickers-store";

export function CoinsTablePriceCell({
    symbol,
}: {
    symbol?: string;
}) {
    const price = useSpotTickersStore((s) => (
        symbol ? s.tickers[symbol]?.c : undefined
    ));

    return (
        <TableCell className="font-mono">
            ${ formatNumber(price) }
        </TableCell>
    );
};
