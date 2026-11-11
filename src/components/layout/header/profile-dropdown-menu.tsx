import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/api/supabase/session/sign-out/sign-out";

export function ProfileDropdownMenu({
    displayName,
}: {
    displayName: string;
}) {
    return (
        <DropdownMenu modal={ false }>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarFallback className="text-lg font-medium">
                        { displayName[0] }
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="
                    flex flex-col
                    w-64 p-1 z-9999
                "
                align="end"
                sideOffset={ 10 }
            >
                <DropdownMenuItem
                    className="
                        flex items-center gap-1 px-3 py-2 cursor-pointer
                        transition-colors duration-200
                    "
                >
                    <Avatar className="size-10">
                        <AvatarFallback className="text-lg font-medium !text-muted-foreground">
                            { displayName[0] }
                        </AvatarFallback>
                    </Avatar>
                    <DropdownMenuLabel className="text-sm text-black font-normal">
                        { displayName }
                    </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-[3px]" />
                <form
                    className="p-2"
                    action={ signOut }
                >
                    <Button
                        size="lg"
                        variant="light-blue"
                        className="flex-1 w-full"
                    >
                        Sign Out
                    </Button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
