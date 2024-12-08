import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Mail,
    MessageSquare,
    Settings,
    User,
    UserPlus,
    Wallet
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "./use-auth-client"

export default function AdminProfileBtn() {

    const { logout } = useAuth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>

                        <Link href="/account/admin/profile" className="flex items-center gap-2">
                            <User />
                            <span>Profile</span>
                        </Link>

                    </DropdownMenuItem>
                    <DropdownMenuItem>

                        <Link href="/account/admin/wallet" className="flex items-center gap-2">
                            <Wallet />
                            <span>Wallet</span>
                        </Link>


                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/account/admin/settings" className="flex items-center gap-2">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button variant="destructive" onClick={logout} className="w-full flex items-center gap-2 font-bold">
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}