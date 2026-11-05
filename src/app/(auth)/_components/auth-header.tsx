import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { AuthStep, AuthStepSetter } from "./auth-template";

export function AuthHeader({
    description,
    authStep,
    authStepSetter,
}: {
    description: string;
    authStep: AuthStep;
    authStepSetter: AuthStepSetter;
}) {
    const router = useRouter();

    const handleGoBack = () => {
        switch (authStep) {
            case 'method': router.back()
                break;
            case 'form': authStepSetter('method')
                break;
            default: redirect('/')
        };
    };

    return (
        <div
            className="
                flex w-full h-fit relative
                justify-center items-center
            "
        >
            <ArrowLeft
                className="
                    text-foreground absolute left-0 top-0 w-7 h-7
                    transition-all duration-150 hover:scale-105
                    hover:bg-black/5 rounded overflow-hidden
                    hover:text-muted-foreground cursor-pointer
                "
                onClick={ () => handleGoBack() }
            />
            <div
                className="flex flex-col items-center"
            >
                <Link
                    href='/'
                    className="
                        font-bold text-xl tracking-tight
                    "
                >
                    Candler
                </Link>
                <span
                    className="text-[12px] font-medium text-muted-foreground"
                >
                    { description }
                </span>
            </div>
            <Link
                href='/'
            >
                <X
                    className="
                        text-foreground absolute right-0 top-0 w-7 h-7
                        transition-all duration-150 hover:scale-105
                        hover:bg-black/5 rounded overflow-hidden
                        hover:text-muted-foreground
                    "
                />
            </Link>
        </div>
    );
};
