import * as React from 'react';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatWindow } from 'typings';

const ChatWindow = ({ friend }: IChatWindow) => {
    const [messages, setMessages] = useState([]); // order messages by date to display them correctly
    const [messageToSend, setMessageToSend] = useState('');

    useEffect(() => {
        // fetch messages
    }, []);

    const updateMessage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMessageToSend(e.target.value);
    };

    const sendMessage = (e: Event) => {
        e.preventDefault();

        // send graphql mutation
    };

    return (
        <div className={'chat-window'}>
            {messages.map(() => (
                <ChatMessage />
            ))}
            <div className={'chat-window__input-container'}>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => updateMessage(e)} value={messageToSend} />
                <button onClick={(e: any) => sendMessage(e)}>Send</button>
            </div>
            <div className={'chat-window__background'} />
        </div>
    );
};

export default ChatWindow;
