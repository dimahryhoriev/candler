'use server'

import { cookies } from "next/headers";

export async function setRecoveryTokens(
    accesToken: string,
    refreshToken: string,
) {
    const cookieStore = await cookies();

    cookieStore.set(
        'access_token',
        accesToken,
        {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 10,
        },
    );

    cookieStore.set(
        'refresh_token',
        refreshToken,
        {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 10,
        },
    );
};
