import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function AuthEmailButton({
    text = 'Email',
}: {
    text?: string;
}) {
    return (
        <Button
            variant="outline"
            className="w-full h-12 text-foreground"
        >
            <Mail />
            { text }
        </Button>
    );
}
