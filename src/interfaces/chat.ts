export interface ChatBubbleProps {
    isUser: boolean;
    type: ChatBubbleType;
    message?: string;
    time?: string;
    duration?: string;
}

export type ChatBubbleType = 'text' | 'audio' | 'typing';
