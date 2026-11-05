'use server'

import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../clients/server-client";

export async function signUp(
    credentials: SignUpWithPasswordCredentials,
) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp(credentials);

    if (error) {
        return {
            error: error.message
        };
    };

    redirect('/');
};
