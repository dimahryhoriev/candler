'use client'

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { authWithGoogle } from "@/lib/api/supabase/session/oauth/auth-with-google";

export function AuthGoogleButton({
    text = 'Continue with Google',
}: {
    text?: string;
}) {
    return (
        <Button
            onClick={ authWithGoogle }
            variant="outline"
            className="w-full h-12 text-foreground"
        >
            <GoogleIcon />
            { text }
        </Button>
    );
};
