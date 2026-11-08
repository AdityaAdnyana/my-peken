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
        <div className=" w-80 flex flex-row ">
            <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
            </Avatar>
            <div className="flex flex-col">
                <p className="text-base font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                </p>
                <p className="text-xs">{lastChat}</p>
            </div>
            
        </div>
    )
}
