import { TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { useTickersStore } from "@/store/use-tickers-store";

export function CoinsTableVolumeCell({
    symbol,
}: {
    symbol?: string;
}) {
    const volume = useTickersStore((state) => (
        symbol
            ? state.tickers[symbol]?.q
            : undefined
    ));

    return (
        <TableCell>
            { formatNumber(volume) }
        </TableCell>
    );
};
