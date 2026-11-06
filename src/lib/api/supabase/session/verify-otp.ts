'use server'

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../clients/server-client";

export type OtpType = 'email' | 'recovery';

export type VerifyOtpParams = {
    email: string;
    token: string;
    type: OtpType;
}

export async function verifyOtp(
    credentials: VerifyOtpParams,
) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.verifyOtp(credentials);

    if (error || !data.session) {
        return {
            error: error?.message
        };
    };

    redirect('/');
};
