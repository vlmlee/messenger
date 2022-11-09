import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatMessage, IChatWindow } from 'typings';
import { gql, useMutation, useQuery } from '@apollo/client';

const POST_MESSAGE = gql`
    mutation PostMessage($input: NewMessageInput!) {
        postMessage(input: $input) {
            fromUser
            toUser
            content
        }
    }
`;

const ChatWindow = ({ loading, selectedChannel }: IChatWindow) => {
    const [postMessage, { data, error }] = useMutation(POST_MESSAGE);
    const [messageToSend, setMessageToSend] = useState('');

    const { user, friend, messages } = selectedChannel ?? {
        id: 0,
        user: null,
        friend: null,
        messages: []
    };

    const updateMessage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMessageToSend(_ => e.target.value);
    };

    const sendMessage = async (e: Event) => {
        await postMessage({
            variables: {
                input: {
                    content: messageToSend,
                    fromUser: user?.id,
                    toUser: friend?.id
                }
            }
        });

        setTimeout(() => {
            const element = document.getElementById('last-message');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            }
        }, 1000);

        // hack
        setTimeout(() => {
            const element = document.getElementById('last-message');
            // @ts-ignore
            element.parentNode!.scrollTop = 10000;
        }, 1500);

        setMessageToSend('');
    };
    const handleOnEnter = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            await sendMessage(e);
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleOnEnter);

        return () => {
            document.removeEventListener('keypress', handleOnEnter);
        };
    }, [messageToSend]);

    return (
        <div className={'chat-window'}>
            <div className={'chat-window__connected-message'}>{loading ? 'Loading...' : 'Connected.'}</div>
            <div className={'chat-window__messages-container'} id={'chat-window__messages-container'}>
                {messages?.map((m: IChatMessage, i: number, arr: any) => (
                    <ChatMessage
                        lastElement={i === arr.length - 1}
                        key={`${m.timestamp}${i}`}
                        isUser={m.fromUser === user?.id}
                        name={user?.id === m.fromUser ? user?.name : friend?.name}
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
