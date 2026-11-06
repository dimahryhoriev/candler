'use server'

import { createSupabaseServerClient } from "../clients/server-client";

export async function login(
    credentials: {
        email: string;
        password: string;
    },
) {
    const supabase = await createSupabaseServerClient();

    const { error: passError } =
        await supabase.auth.signInWithPassword(credentials);

    if (passError) {
        return {
            email: null,
            error: 'Invalid email or password',
        };
    };

    const { error: otpError } =
        await supabase.auth.signInWithOtp({
            email: credentials.email,
            options: {
                shouldCreateUser: false,
            },
        });

    if (otpError) {
        return {
            email: null,
            error: 'Failed to send verification code. Try again later.'
        }
    };

    return {
        email: credentials.email,
        error: undefined,
    };
};
