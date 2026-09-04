import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { IChatMessage, IChatWindow, IUser } from '../typings';
import { gql, useMutation } from '@apollo/client';

const CHANNEL_FADE_MS = 220;

const POST_MESSAGE = gql`
    mutation PostMessage($message: NewMessageInput!) {
        postMessage(message: $message) {
            id
            fromUser
            toUser
            channelId
            content
            createdAt
        }
    }
`;

const ChatWindow = ({ loading, selectedChannel, users, disabled }: IChatWindow) => {
    const [postMessage] = useMutation(POST_MESSAGE, {
        refetchQueries: ['GetUsers'],
        awaitRefetchQueries: true
    });
    const [messageToSend, setMessageToSend] = useState('');

    const { id: channelId, user, friend, messages } = selectedChannel ?? {
        id: undefined,
        user: null,
        friend: null,
        messages: []
    };

    const [displayedChannelId, setDisplayedChannelId] = useState(channelId);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (channelId === displayedChannelId) {
            return;
        }

        setIsFading(true);
        const swap = window.setTimeout(() => {
            setDisplayedChannelId(channelId);
        }, CHANNEL_FADE_MS);

        return () => window.clearTimeout(swap);
    }, [channelId, displayedChannelId]);

    useEffect(() => {
        if (!isFading || displayedChannelId !== channelId) {
            return;
        }

        const show = window.setTimeout(() => {
            setIsFading(false);
        }, 16);

        return () => window.clearTimeout(show);
    }, [isFading, displayedChannelId, channelId]);

    const channelMessages = (messages ?? []).filter(
        (m: IChatMessage) => m.channelId === displayedChannelId
    );

    const senderName = (fromUser?: number) => {
        if (fromUser === user?.id) {
            return user?.name;
        }
        const sender = users?.find((u: IUser) => u.id === fromUser);
        return sender?.name ?? friend?.name ?? '';
    };

    const updateMessage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMessageToSend(_ => e.target.value);
    };

    const sendMessage = async (e: Event) => {
        if (disabled || !user?.id || channelId == null || !messageToSend.trim()) {
            return;
        }

        await postMessage({
            variables: {
                message: {
                    content: messageToSend,
                    fromUser: user.id,
                    toUser: friend?.id || 0,
                    channelId
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
            if (element) {
                // @ts-ignore
                element.parentNode!.scrollTop = 10000;
            }
        }, 1500);

        setMessageToSend('');
    };
    const handleOnEnter = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            await sendMessage(e);
        }
    };

    useEffect(() => {
        if (disabled) {
            return;
        }

        document.addEventListener('keypress', handleOnEnter);

        return () => {
            document.removeEventListener('keypress', handleOnEnter);
        };
    }, [messageToSend, disabled, channelId]);

    return (
        <div className={'chat-window crt'}>
            <div className={'chat-window__connected-message'}>{loading ? 'Loading...' : 'Connected.'}</div>
            <div
                className={
                    'chat-window__messages-container' +
                    (isFading ? ' chat-window__messages-container--fading' : '')
                }
                id={'chat-window__messages-container'}>
                {channelMessages.map((m: IChatMessage, i: number, arr: IChatMessage[]) => (
                    <ChatMessage
                        lastElement={i === arr.length - 1}
                        key={`${m.timestamp}${i}`}
                        isUser={m.fromUser === user?.id}
                        name={senderName(m.fromUser)}
                        content={m.content}
                        timestamp={m.timestamp}
                    />
                ))}
            </div>
            <div className={'chat-window__input-container'}>
                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateMessage(e)}
                    value={messageToSend}
                    placeholder={'Say something...'}
                    disabled={disabled}
                />
                <button onClick={(e: any) => sendMessage(e)} disabled={disabled}>
                    Send
                </button>
            </div>
            <div className={'chat-window__background'} />
        </div>
    );
};

export default ChatWindow;
