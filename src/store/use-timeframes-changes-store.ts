import { fetchKlines } from "@/lib/api/fetch-klines";
import { TimeframeKey, timeframesConfigMap } from "@/lib/charts/timeframes";
import { calculateChangePercent } from "@/lib/math/change";
import { create } from "zustand";

export type AssetsTimeframesChanges = Record<string, Record<TimeframeKey, number>>;

type TimeframesChangesStore = {
    changes: AssetsTimeframesChanges;
    loadChanges: (
        symbols: string[],
        keys?: TimeframeKey[],
    ) => Promise<void>;
};

export const useTimeframesChangesStore = create<TimeframesChangesStore>(
    (set, get) => ({
        changes: {},
        loadChanges: async (
            symbols,
            keys = Object.keys(timeframesConfigMap) as TimeframeKey[],
        ) => {
            const currentChanges = get().changes;
            const missingSymbols = symbols.filter((s) => !currentChanges[s]);

            if (missingSymbols.length === 0) return;

            try {
                const newChanges = await fetchTimeframesChanges(missingSymbols, keys);

                set((state) => ({
                    changes: {
                        ...state.changes,
                        ...newChanges,
                    },
                    isLoading: false,
                }));
            } catch (error) {
                console.error("Failed to fetch timeframe changes: ", error);
            };
        },
    })
);

export async function fetchTimeframesChanges(
    symbols: string[],
    keys: TimeframeKey[],
): Promise<AssetsTimeframesChanges> {
    const result: AssetsTimeframesChanges = {};
    for (const s of symbols) {
        result[s] = {} as Record<TimeframeKey, number>;
    };

    await Promise.allSettled(
        keys.map(
            async (key) => {
                const { interval, limit } = timeframesConfigMap[key];
                const assetsKlines = await fetchKlines({ symbols, interval, limit });

                for (const item of assetsKlines) {
                    const klines = item.klines;
                    if (!klines.length) continue;

                    const openValue = klines[0].openPrice;
                    const closeValue = klines[klines.length - 1].closePrice;
                    const changePercent = calculateChangePercent({ openValue, closeValue });

                    if (result[item.symbol]) {
                        result[item.symbol][key] = changePercent;
                    };
                };
            },
        ),
    );

    return result;
};
