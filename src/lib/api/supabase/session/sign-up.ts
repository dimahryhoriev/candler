'use server'

import { createSupabaseServerClient } from "../clients/server-client";

export async function signUp(
    credentials: {
        email: string;
        password: string;
    },
) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp(credentials);

    if (error) {
        return {
            email: null,
            error: error.message,
        };
    };

    return {
        email: credentials.email,
        error: undefined,
    };
};
