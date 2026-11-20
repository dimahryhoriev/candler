import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { useTickersStore } from "@/store/use-tickers-store";

export function CoinsTablePriceCell({
    symbol,
}: {
    symbol?: string;
}) {
    const price = useTickersStore((state) => (
        symbol
            ? state.tickers[symbol]?.c
            : undefined
    ));

    return (
        <TableCell>
            ${ formatNumber(price) }
        </TableCell>
    );
};
