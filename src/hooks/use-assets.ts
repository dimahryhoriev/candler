'use client'

import { ApiSchemas } from "@/api";
import { AssetSortOptions, sortAssets, SortOrder } from "@/lib/assets";
import { useMemo } from "react";
import { useStream } from "./use-stream";

export type Asset = ApiSchemas['TickerResponse'];
type UseAssetsParams = {
    enabled?: boolean;
    limit?: number;
    sortOption?: AssetSortOptions;
    sortOrder?: SortOrder;
};

const WS_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_WS_URL
    ??
    'wss://stream.binance.com:9443/ws'

const TICKERS_WS_URL = `${WS_BASE_URL}/!miniTicker@arr`;


export function useAssets({
    enabled = true,
    limit = 5,
    sortOption = 'volume',
    sortOrder = 'desc',
}: UseAssetsParams = {}) {
    const {
        data: tickers,
        isConnected,
        disconnect,
    } = useStream<Asset[]>(
        TICKERS_WS_URL,
        { enabled },
    );

    const assets = useMemo(() => {
        if (!Array.isArray(tickers)) return (
            Array.from(
                {
                    length: limit
                },
                () => undefined
            )
        );

        return sortAssets({
            assets: tickers,
            sortOption: sortOption,
            sortOrder,
            limit,
        });
    }, [
        tickers,
        limit,
        sortOption,
        sortOrder,
    ]);

    return {
        assets,
        isConnected,
        disconnect,
    };
};
