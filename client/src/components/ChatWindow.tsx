import * as React from 'react';
import { useEffect, useState } from 'react';
import ChatMessage from '~components/ChatMessage';
import { IChatWindow } from '~typings';

const ChatWindow = ({ friend }: IChatWindow) => {
    const [messages, setMessages] = useState([]); // order messages by date to display them correctly

    useEffect(() => {
        // fetch messages
    }, []);

    return (
        <div>
            {messages.map(() => (
                <ChatMessage />
            ))}
        </div>
    );
};

export default ChatWindow;
