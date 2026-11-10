import { ChatSideBar } from "@/components/seller/Chat/ChatSideBar"
import MainChat from "@/components/seller/Chat/MainChat"

const data ={
    user :{
        name :"udin",
        avatar :"/Sakamoto.jpg",
        lastText : "Alo"
    },
    
}

export default function ChatSeller(){
    return(
        <main className=" flex flex-row">
            <ChatSideBar />
            <MainChat />
        </main>
    )
}
