import * as React from 'react';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatMessage, IChatWindow } from 'typings';

const ChatWindow = ({ user, friend }: IChatWindow) => {
    const [messages, setMessages] = useState<IChatMessage[]>([
        { id: 0, name: 'user', content: 'test', timestamp: new Date().toISOString() },
        { id: 1, name: 'friend', content: 'hello', timestamp: new Date().toISOString() },
        { id: 0, name: 'user', content: 'hi', timestamp: new Date().toISOString() },
        {
            id: 0,
            name: 'user',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            timestamp: new Date().toISOString()
        },
        {
            id: 1,
            name: 'friend',
            content:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
            timestamp: new Date().toISOString()
        }
    ]); // order messages by date to display them correctly
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
                {messages.map((m: IChatMessage, i: number) => (
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
