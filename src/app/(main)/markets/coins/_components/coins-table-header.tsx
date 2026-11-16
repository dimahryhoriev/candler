import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Tab } from "./coins-table";
import { tabColumns } from "./coins-table.config";

export function CoinsTableHeader({
    tab,
}: {
    tab: Tab;
}) {
    return (
        <TableHeader>
            <TableRow>
                {
                    tabColumns[tab].map((tc) => (
                        <TableHead
                            key={ tc.key }
                            className={
                                cn(
                                    'hover:bg-muted font-normal text-zinc-500',
                                    tc.key === 'asset' && 'sticky left-0 z-20'
                                )
                            }
                        >
                            <div className="flex items-center gap-1">
                                { tc.icon }
                                { tc.label }
                            </div>
                        </TableHead>
                    ))
                }
            </TableRow>
        </TableHeader>
    );
};
