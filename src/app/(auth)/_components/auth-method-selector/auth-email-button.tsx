'use client'

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function AuthEmailButton({
    text = 'Email',
}: {
    text?: string;
}) {
    const router = useRouter();
    const path = usePathname();
    const handleOnClick = () => router.replace(`${path}?auth_step=email`);

    return (
        <Button
            variant="outline"
            className="w-full h-12 text-foreground"
            onClick={ handleOnClick }
        >
            <Mail />
            { text }
        </Button>
    );
};
