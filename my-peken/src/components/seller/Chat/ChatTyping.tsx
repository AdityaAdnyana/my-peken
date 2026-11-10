"use client";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { FieldLabel } from "@base-ui/react";
import { useState } from "react";
import BubbleChat from "./BubbleChat";



function RenderBubbleChat(messageArray: ChatMessage[]) {
    return (
        <div className="flex flex-col w-full">
            {messageArray.map((msg, index) => (
                <BubbleChat key={index} idUser={msg.idUser} idChat={msg.idChat} textChat={msg.message} />
            ))}
        </div>
    )    
}
class ChatMessage {
    message: string;
    idUser: number;
    idChat: number;

    
    constructor(message: string, idUser: number, idChat: number) {
        this.message = message;
        this.idUser = idUser;
        this.idChat = idChat;
    }
}

export function ChatTyping() {
    const [message, setMessage] = useState("");
    const [messageArray, setMessageArray] = useState<ChatMessage[]>([]);
    return (
        <div className="w-dvh h-full flex flex-col ">
            <div className="w-dvh border rounded-lg basis-9/10 ">
                {RenderBubbleChat(messageArray)}
            </div>
            <div className="w-dvh border rounded-lg  flex flex-row basis-1/10 ">

                <div>
                    <InputGroup className="w-dvh ">
                        <InputGroupInput
                            id="block-end-textarea"
                            placeholder="Type a Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <InputGroupAddon align="block-end">
                            <InputGroupButton variant="default" size="sm" className="ml-auto" onClick={() => {
                                setMessageArray(prev => [...prev, new ChatMessage(message, 1, 1)]);
                                setMessageArray(prev => [...prev, new ChatMessage("API Offline", 1, 2)]);
                                setMessage("");
                                RenderBubbleChat(messageArray);
                                
                            }}>
                                Send
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>

                </div>
            </div>
            
        </div>
    )
}