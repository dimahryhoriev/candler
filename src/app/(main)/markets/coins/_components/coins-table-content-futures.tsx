import { useFuturesAssets } from "@/hooks/assets/use-futures-assets";
import { getAssetsSymbols } from "@/lib/assets/assets-unpackers";
import { useMemo } from "react";
import { CoinsTableTab } from "./coins-table";
import { CoinsTableBody } from "./coins-table-body";

export function CoinsTableContentFutures({
    limit,
    tab,
}: {
    limit: number;
    tab: CoinsTableTab;
}) {
    const { assets } = useFuturesAssets({
        limit,
        typeOptions: {
            stables: false,
            majors: true,
            altcoins: true,
        },
    });

    const symbols = useMemo(() => getAssetsSymbols(assets), [assets]);

    return (
        <CoinsTableBody
            assets={ assets }
            symbols={ symbols }
            tab={ tab }
        />
    );
}
