"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface propsHeader {
    avatarSrc: string;
    username: string;
}

export function HeaderChat({ avatarSrc, username }: propsHeader) {
    return (
        <div className="h-10 flex flex-row bg-off-white rounded-tr-lg border-b border-mypeken-light-gray">
            <div className="flex flex row">
                <Avatar className="">
                    <AvatarImage src={avatarSrc} alt={username} />
                </Avatar>
                <p className="font-bold text-base "> {username}</p>
            </div>
        </div>
    )
}