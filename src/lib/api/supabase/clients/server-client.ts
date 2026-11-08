'use server'

import { CookieMethodsServer, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient(
    options?: CookieMethodsServer,
) {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: options ?? {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookies) {
                    try {
                        cookies.forEach(
                            ({ name, value, options }) => (
                                cookieStore.set(name, value, options)
                            ),
                        );
                    } catch { };
                },
            },
        },
    );
};
