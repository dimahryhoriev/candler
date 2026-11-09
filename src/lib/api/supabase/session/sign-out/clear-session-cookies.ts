'use server'

import { cookies } from "next/headers";

export async function clearSessionCookies() {
    const cookieStore = await cookies();
    const authCookies = cookieStore.getAll().filter(
        c => c.name.startsWith('sb-')
    );

    for (const cookie of authCookies) {
        cookieStore.delete({
            name: cookie.name,
            path: '/',
        });
    };
};
