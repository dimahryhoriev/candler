'use client'

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useAuthStep } from "../../_hooks/use-auth-step";

export function AuthEmailButton({
    text = 'Email',
}: {
    text?: string;
}) {
    const { changeAuthStep } = useAuthStep();

    return (
        <Button
            variant="outline"
            className="w-full h-12 text-foreground"
            onClick={ () => changeAuthStep('email') }
        >
            <Mail />
            { text }
        </Button>
    );
};
