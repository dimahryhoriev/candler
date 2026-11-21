import { TableCell } from "@/components/ui/table";

export function CoinsTableRankCell({
    index,
}: {
    index: number;
}) {
    return (
        <TableCell className="text-center w-20">
            {
                String(index + 1)
            }
        </TableCell>
    );
};
