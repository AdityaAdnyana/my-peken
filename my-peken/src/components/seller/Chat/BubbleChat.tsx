"use client";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";

interface PropsBubbleChat {
    idUser: number;
    idChat: number;
    textChat: string;
}

export default function BubbleChat({ idUser, idChat, textChat }: PropsBubbleChat) {
    if (idChat == idUser) {
        return (
            <div className="flex flex-col gap-2 w-full h-full">
                <BubbleGroup>
                    <Bubble variant="default" align="end">
                        <BubbleContent>
                            {textChat}
                        </BubbleContent>
                    </Bubble>
                </BubbleGroup>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-2 w-full h-full">
                <BubbleGroup>
                    <Bubble variant="secondary" align="start">
                        <BubbleContent>
                            {textChat}
                        </BubbleContent>
                    </Bubble>
                </BubbleGroup>
            </div>
        )
    }

}