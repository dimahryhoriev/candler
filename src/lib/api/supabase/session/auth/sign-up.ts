'use server'

import { createSupabaseServerClient } from "../../clients/server-client";
import { isUsernameUnique } from "../user/is-username-unique";

type SignUpCredentials = {
    email: string;
    password: string;
    username: string;
    name: string;
};

export async function signUp({
    email,
    password,
    username,
    name,
}: SignUpCredentials) {
    try {
        const isUnique = await isUsernameUnique(username);
        if (!isUnique) {
            return {
                error: 'This username is already taken',
                field: 'username' as const,
            };
        };
    } catch {
        return {
            error: 'Failed to verify username. Try again...',
        };
    };

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                name,
            },
        },
    });

    if (error) {
        return {
            email: null,
            error: error.message,
        };
    };

    return {
        email,
        error: undefined,
    };
};
