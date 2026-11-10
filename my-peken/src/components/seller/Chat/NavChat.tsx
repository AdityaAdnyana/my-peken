"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarSeparator } from "@/components/ui/sidebar"
import { use } from "react";


interface NavChatProps {
    user: {
        name: string;
        avatar: string;
    }
    lastChat?: string;
}

export function NavChat({ user, lastChat = " " }: NavChatProps) {

    return (
        <div className="flex flex-row rounded-xl bg-mypeken-white ">
            <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
            </Avatar>
            <div className="flex flex-col">
                <p className="text-base font-semibold">
                    {user.name.toUpperCase()}
                </p>
                <p className="text-xs">{lastChat}</p>
            </div>
        </div>
    )
}
