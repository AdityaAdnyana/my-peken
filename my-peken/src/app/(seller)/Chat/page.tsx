import { ChatSideBar } from "@/components/seller/Chat/ChatSideBar"

const data ={
    user :{
        name :"udin",
        avatar :"/Sakamoto.jpg",
        lastText : "Alo"
    },
    
}

export default function ChatSeller(){
    return(
        <main>
            <ChatSideBar />
        </main>
    )
}
