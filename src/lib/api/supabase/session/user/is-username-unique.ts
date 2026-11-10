'use server'

import { createSupabaseServerClient } from "../../clients/server-client";

export async function isUsernameUnique(
    username: string,
) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

    if (error) throw new Error(error.message);

    return data === null;
};
