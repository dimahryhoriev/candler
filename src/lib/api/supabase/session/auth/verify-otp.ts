'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../clients/server-client";
import { setRecoveryTokens } from "../password/set-recovery-token";

export type OtpType = 'email' | 'recovery';

export type VerifyOtpParams = {
    email: string;
    token: string;
    type: OtpType;
}

export async function verifyOtp(
    credentials: VerifyOtpParams,
) {
    const cookieStore = await cookies();
    const supabase = await createSupabaseServerClient({
        getAll: () => cookieStore.getAll(),
    });

    const { data, error } = await supabase.auth.verifyOtp(credentials);

    if (error || !data.session) {
        return {
            error: error?.message
        };
    };

    if (credentials.type === 'recovery') {
        await setRecoveryTokens(
            data.session.access_token,
            data.session.refresh_token,
        );
        redirect('/update-password');
    };

    redirect('/');
};
