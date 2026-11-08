'use server'

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../clients/server-client";
import { clearSessionCookies } from "./clear-session-cookies";

export async function signOut() {
    const supabase = await createSupabaseServerClient();

    await supabase.auth.signOut();
    await clearSessionCookies();

    redirect('/login');
};
