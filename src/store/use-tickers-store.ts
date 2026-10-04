import { Asset } from "@/hooks/use-assets";
import { create } from "zustand";

type TickersRecord = Record<string, Asset>;

type TickersStore = {
    tickers: Record<string, Asset>;
    isInitialized: boolean;
    setInitialTickers: (assets: Asset[]) => void;
    updateTickers: (assets: Asset[]) => void;
};

const toTickersRecord = (
    assets: Asset[]
): TickersRecord => {
    return (
        Object.fromEntries(
            assets.map((a) => [a.s, a])
        )
    );
};

export const useTickersStore = create<TickersStore>(
    (set) => ({
        tickers: {},
        isInitialized: false,

        setInitialTickers: (assets) => (
            set({
                tickers: toTickersRecord(assets),
                isInitialized: true,
            })
        ),

        updateTickers: (assets) => (
            set((state) => ({
                tickers: {
                    ...state.tickers,
                    ...toTickersRecord(assets),
                }
            }))
        ),
    }),
);
