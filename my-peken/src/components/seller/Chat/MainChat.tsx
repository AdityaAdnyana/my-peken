"use client";
import { HeaderChat } from "./HeaderChat";
import { ChatTyping } from "./ChatTyping";

const data={
    user:{
        avatarSrc: "/Sakamoto.jpg",
        username :"Sakamoto-san"
    }
}

export default function MainChat(){
    return(
        <div className="w-dvh flex flex-col rounded-r-lg bg-mypeken-white">
            <HeaderChat avatarSrc={data.user.avatarSrc} username={data.user.username} />
            
            <ChatTyping />
        </div>
    )
}