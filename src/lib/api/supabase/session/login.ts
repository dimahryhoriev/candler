'use server'

import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../clients/server-client";

export async function login(
    credentials: SignInWithPasswordCredentials,
) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
        return {
            error: error.message
        };
    };

    redirect('/');
};
