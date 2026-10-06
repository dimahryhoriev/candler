'use client'

import { ApiSchemas } from "@/api";
import { AssetSortOptions, sortAssets, SortOrder } from "@/lib/assets";
import { useTickersStore } from "@/store/use-tickers-store";
import { useEffect, useMemo } from "react";

export type Asset = ApiSchemas['WebsocketTickerResponse'];
type UseAssetsParams = {
    limit?: number;
    sortOption?: AssetSortOptions;
    sortOrder?: SortOrder;
};

export function useAssets({
    limit = 5,
    sortOption = 'volume',
    sortOrder = 'desc',
}: UseAssetsParams = {}) {
    const isInitialized = useTickersStore(s => s.isInitialized);
    const initTickers = useTickersStore(s => s.init);
    const isConnected = useTickersStore(s => s.isConnected);
    const disconnect = useTickersStore(s => s.disconnect);
    const tickers = useTickersStore(s => s.tickers);

    useEffect(() => {
        if (!isInitialized) initTickers();
    }, [
        isInitialized,
        initTickers,
    ]);

    const assets = useMemo(() => {
        const tickersList = Object.values(tickers);

        if (tickersList.length === 0) {
            return Array.from(
                {
                    length: limit,
                },
                () => undefined,
            );
        };

        return sortAssets({
            assets: tickersList,
            sortOption,
            sortOrder,
            limit,
        });
    }, [
        tickers,
        sortOption,
        sortOrder,
        limit,
    ]);

    return {
        assets,
        isConnected,
        disconnect,
    };
};
