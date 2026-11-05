'use client'

import { createSupabaseBrowserClient } from "../clients/browser-client";

export async function authWithGoogle() {
    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth-callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        console.error('Google Auth error: ', error.message);
    };
};
