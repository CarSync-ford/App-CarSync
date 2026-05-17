import { ChatBubbleType } from '../types/chat';;

export interface ChatBubbleProps {
    isUser: boolean;
    type: ChatBubbleType;
    message?: string;
    time?: string;
    duration?: string;
}
