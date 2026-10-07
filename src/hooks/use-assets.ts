'use client'

import { ApiSchemas } from "@/api";
import { AssetSortOptions, AssetsTypeOptions, sortAssets, SortOrder } from "@/lib/assets";
import { useTickersStore } from "@/store/use-tickers-store";
import { useEffect, useMemo } from "react";

export type Asset = ApiSchemas['WebsocketTickerResponse'];

type UseAssetsParams = {
    limit?: number;
    sortOption?: AssetSortOptions;
    sortOrder?: SortOrder;
    typeOptions?: AssetsTypeOptions;
};

export function useAssets({
    limit = 5,
    sortOption = 'volume',
    sortOrder = 'desc',
    typeOptions = {
        stables: false,
        majors: true,
        altcoins: true,
    },
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
            typeOptions,
            limit,
        });
    }, [
        tickers,
        sortOption,
        sortOrder,
        typeOptions,
        limit,
    ]);

    return {
        assets,
        isConnected,
        disconnect,
    };
};
