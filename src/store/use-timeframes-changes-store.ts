import { fetchTimeframesChanges, TimeframeKey } from "@/lib/charts/timeframes";
import { create } from "zustand";

export type AssetsTimeframesChanges = Record<string, Record<TimeframeKey, number>>;

type TimeframesChangesStore = {
    changes: AssetsTimeframesChanges;
    isLoading: boolean;
    loadChanges: (symbols: string[]) => Promise<void>;
};

export const useTimeframesChangesStore = create<TimeframesChangesStore>(
    (set, get) => ({
        changes: {},
        isLoading: false,
        loadChanges: async (symbols: string[]) => {
            const currentChanges = get().changes;
            const missingSymbols = symbols.filter(s => !currentChanges[s]);

            if (missingSymbols.length === 0) return;
            set({ isLoading: true });

            try {
                const newChanges = await fetchTimeframesChanges(missingSymbols);

                set((state) => ({
                    changes: {
                        ...state.changes,
                        ...newChanges,
                    },
                    isLoading: false,
                }));
            } catch (error) {
                console.error("Failed to fetch timeframe changes: ", error);
                set({ isLoading: false });
            };
        },
    })
);
