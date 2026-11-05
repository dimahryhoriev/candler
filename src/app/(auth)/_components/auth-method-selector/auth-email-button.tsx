import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { AuthStepSetter } from "../auth-template";

export function AuthEmailButton({
    text = 'Email',
    onClick,
}: {
    text?: string;
    onClick: AuthStepSetter;
}) {
    return (
        <Button
            variant="outline"
            className="w-full h-12 text-foreground"
            onClick={ () => onClick('form') }
        >
            <Mail />
            { text }
        </Button>
    );
}
