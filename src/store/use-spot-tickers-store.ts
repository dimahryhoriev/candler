import { ApiSchemas } from "@/api";
import { createStream } from "@/lib/api/create-stream";
import { create } from "zustand";

export type SpotAsset = ApiSchemas['WebsocketSpotTickerResponse'];

type SpotTickersRecord = Record<string, SpotAsset>;

export type SpotTickersStore = {
    tickers: Record<string, SpotAsset>;
    totalCount: number;
    isInitialized: boolean;
    isLoading: boolean;
    isConnected: boolean;
    init: () => void;
    update: (data: SpotTickersRecord) => void;
    disconnect: () => void;
};

const REST_SPOT_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_SPOT_REST_URL
    ??
    'https://api.binance.com/api/v3'

const WS_SPOT_BASE_URL =
    process.env.NEXT_PUBLIC_BINANCE_SPOT_WS_URL
    ??
    'wss://stream.binance.com:9443/ws'

const SPOT_TICKERS_REST_URL = `${REST_SPOT_BASE_URL}/ticker/24hr`;
const SPOT_TICKERS_WS_URL = `${WS_SPOT_BASE_URL}/!miniTicker@arr`;

const spotTickersStream = createStream<SpotAsset[]>({
    url: SPOT_TICKERS_WS_URL,
    onData: (data) => {
        useSpotTickersStore.getState().update(
            toSpotTickersRecord(data),
        );
    },
    onStatusChange: (isConnected) => {
        useSpotTickersStore.setState({
            isConnected,
        });
    },
});

export const useSpotTickersStore = (
    create<SpotTickersStore>(
        (set, get) => ({
            tickers: {},
            totalCount: 0,
            isInitialized: false,
            isLoading: false,
            isConnected: false,
            init: async () => {
                if (
                    get().isInitialized
                    ||
                    get().isLoading
                ) {
                    return;
                };

                set({ isLoading: true });

                try {
                    const rawTickers = await fetchSpotTickers();
                    const tickersRecord = toSpotTickersRecord(rawTickers);
                    set({
                        tickers: tickersRecord,
                        totalCount: rawTickers.length,
                        isInitialized: rawTickers.length > 0,
                        isLoading: false,
                    })
                    spotTickersStream.connect();
                } catch (error) {
                    console.error('Failed to load initial tickers: ', error);
                    set({ isLoading: false });
                };
            },
            update: (newTickers) => {
                set((state) => ({
                    tickers: {
                        ...state.tickers,
                        ...newTickers,
                    },
                }));
            },
            disconnect: () => {
                spotTickersStream.disconnect();
            },
        }),
    )
);

async function fetchSpotTickers() {
    const res = await fetch(SPOT_TICKERS_REST_URL);
    if (!res.ok) {
        throw new Error(`Failed to fetch spot tickers: ${res.statusText}`);
    };

    const data: ApiSchemas['RestSpotTickerResponse'][]
        = await res.json();
    const now = Date.now();
    const maxInactivityTime = 10 * 60 * 1000;

    return data
        .filter(
            (item) => {
                const hasVolume = Number(item.quoteVolume) > 0;
                const isActive = item.closeTime
                    ? (now - item.closeTime) < maxInactivityTime
                    : false

                return isActive && hasVolume;
            },
        )
        .map(
            (item) => ({
                s: item.symbol,
                c: item.lastPrice,
                o: item.openPrice,
                q: item.quoteVolume,
                C: item.closeTime,
            } as SpotAsset)
        );
};

const toSpotTickersRecord = (
    assets: SpotAsset[]
): SpotTickersRecord => {
    return (
        Object.fromEntries(
            assets.map((a) => [a.s, a])
        )
    );
};
