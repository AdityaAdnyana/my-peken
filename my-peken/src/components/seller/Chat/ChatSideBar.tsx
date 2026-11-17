"use client";
import { NavChat } from '@/components/seller/Chat/NavChat'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar } from '@base-ui/react';
import { userInfo } from 'node:os';
const data = {
    user: {
        name: "Sakamoto-san",
        avatar: "/Sakamoto.jpg",
        lastText: "Alo"
    },

}

export function ChatSideBar() {
    
    return (
        <div className='w-60 h-dvh flex flex-col flex-nowrap bg-off-white border border-mypeken-light-gray rounded-l-lg '>
            <div className='m-4 w-52 grid grid-col-1 gap-1 devide-y-8'>
                <NavChat user={data.user} lastChat={data.user.lastText} />
                <NavChat user={data.user} lastChat={data.user.lastText} />

            </div>
        </div>
    )
}