import { useSpotAssets } from "@/hooks/assets/use-spot-assets";
import { getAssetsSymbols } from "@/lib/assets/assets-unpackers";
import { useTimeframesChangesStore } from "@/store/use-timeframes-changes-store";
import { useEffect, useMemo } from "react";
import { CoinsTableTab } from "./coins-table";
import { CoinsTableBody } from "./coins-table-body";

export function CoinsTableContentSpot({
    limit,
    tab,
}: {
    limit: number;
    tab: CoinsTableTab;
}) {
    const { assets } = useSpotAssets({
        limit,
        typeOptions: {
            stables: false,
            majors: true,
            altcoins: true,
        },
    });

    const symbols = useMemo(() => getAssetsSymbols(assets), [assets]);
    const loadChanges = useTimeframesChangesStore(s => s.loadChanges);

    useEffect(() => {
        loadChanges(symbols);
    }, [loadChanges, symbols])

    return (
        <CoinsTableBody
            assets={ assets }
            tab={ tab }
            market="spot"
        />
    );
}
