import { TableCell } from "@/components/ui/table";

export function CoinsTableRankCell({
    index,
}: {
    index: number;
}) {
    return (
        <TableCell>
            {
                String(index + 1)
            }
        </TableCell>
    );
};
