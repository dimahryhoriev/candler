import { createSupabaseBrowserClient } from "@/lib/api/supabase/clients/browser-client";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthStore = {
    user: User | null;
    isLoading: boolean;
    isInitialized: boolean;
    init: () => () => void;
    signOut: () => Promise<void>;
};

export const useAuthStore = (
    create<AuthStore>(
        (set, get) => ({
            user: null,
            isLoading: true,
            isInitialized: false,
            init: () => {
                if (get().isInitialized) return () => { };

                const supabase = createSupabaseBrowserClient();
                set({ isLoading: true });

                supabase.auth.getUser().then(
                    ({ data }) => {
                        set({
                            user: data.user,
                            isLoading: false,
                            isInitialized: true,
                        });
                    },
                );

                const { data: { subscription } } =
                    supabase.auth.onAuthStateChange(
                        (_e, session) => {
                            set({
                                user: session?.user ?? null,
                                isLoading: false,
                                isInitialized: true,
                            });
                        },
                    );

                return () => {
                    subscription.unsubscribe();
                };
            },
            signOut: async () => {
                const supabase = createSupabaseBrowserClient();
                await supabase.auth.signOut();
                set({ user: null });
            },
        }),
    )
);
