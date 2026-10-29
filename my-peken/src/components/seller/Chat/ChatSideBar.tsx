"use client";
import {NavChat} from '@/components/seller/Chat/NavChat'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar } from '@base-ui/react';
const data ={
    user :{
        name :"udin",
        avatar :"/Sakamoto.jpg",
        lastText : "Alo"
    },
    
}

export function ChatSideBar(){
    return(
        <div className='w-80 flex flex-col flex-nowrap  devide-y-2 devide-mypeken-black bg-mypeken-light-gray'>
            <NavChat user={data.user} lastChat={data.user.lastText}/>
            <NavChat user={data.user} lastChat={data.user.lastText}/>   
        </div>
    )
}