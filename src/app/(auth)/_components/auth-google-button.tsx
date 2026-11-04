'use client'

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { createSupabaseBrowserClient } from "@/lib/api/supabase/clients/browser-client";

export function AuthGoogleButton({
    text = 'Continue with Google',
}: {
    text?: string;
}) {
    const handleAuth = async () => {
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

    return (
        <Button
            onClick={ handleAuth }
            variant="outline"
            className="w-full h-12 text-foreground"
        >
            <GoogleIcon />
            { text }
        </Button>
    );
};
