import * as React from 'react';
import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatWindow } from 'typings';

const ChatWindow = ({ friend }: IChatWindow) => {
    const [messages, setMessages] = useState([]); // order messages by date to display them correctly

    useEffect(() => {
        // fetch messages
    }, []);

    return (
        <div className={'chat-window'}>
            {messages.map(() => (
                <ChatMessage />
            ))}
            <div className={'chat-window__background'} />
        </div>
    );
};

export default ChatWindow;
