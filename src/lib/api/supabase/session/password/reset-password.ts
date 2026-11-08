'use server'

import { createSupabaseServerClient } from "../../clients/server-client";

export async function resetPassword(
    email: string,
) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        return {
            error: error.message,
        };
    };

    return {
        error: null,
    };
};
