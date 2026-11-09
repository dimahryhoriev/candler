'use server'

import { createSupabaseServerClient } from "../../clients/server-client";

export async function getUser() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (error || !data?.user) return null;

    return data.user;
};
