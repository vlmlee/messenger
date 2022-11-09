import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatMessage, IChatWindow } from 'typings';

const ChatWindow = ({ selectedChannel }: IChatWindow) => {
    const { user, friend, messages } = selectedChannel ?? {
        user: null,
        friend: null,
        messages: []
    };
    const [messageToSend, setMessageToSend] = useState('');

    const updateMessage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMessageToSend(e.target.value);
    };

    const sendMessage = (e: Event) => {
        e.preventDefault();

        // send graphql mutation
    };

    const handleOnEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage(e);
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleOnEnter);

        return () => {
            document.removeEventListener('keypress', handleOnEnter);
        };
    }, []);

    return (
        <div className={'chat-window'}>
            <div className={'chat-window__connected-message'}>Connected.</div>
            <div className={'chat-window__messages-container'}>
                {messages?.map((m: IChatMessage, i: number) => (
                    <ChatMessage
                        key={`${m.timestamp}${i}`}
                        isUser={m.id === user?.id}
                        name={m.name}
                        content={m.content}
                        timestamp={m.timestamp}
                    />
                ))}
            </div>
            <div className={'chat-window__input-container'}>
                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateMessage(e)}
                    value={messageToSend}
                    placeholder={'Welcome to the internet!'}
                />
                <button onClick={(e: any) => sendMessage(e)}>Send</button>
            </div>
            <div className={'chat-window__background'} />
        </div>
    );
};

export default ChatWindow;
