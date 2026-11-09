'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../clients/server-client";

export async function updatePassword(
    password: string,
) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!accessToken || !refreshToken) {
        return {
            error: 'Session expired or invalid. Please request a new code.',
        };
    };

    const supabase = await createSupabaseServerClient();

    const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    if (sessionError) {
        return {
            error: sessionError.message,
        };
    };

    const { error } = await supabase.auth.updateUser({
        password,
    });

    if (error) {
        return {
            error: error.message,
        };
    };

    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    redirect('/');
};
