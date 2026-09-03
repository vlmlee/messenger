import * as React from 'react';
import { IChatMessage } from '../typings';

const ChatMessage = ({ lastElement, name, content, timestamp, isUser }: IChatMessage) => (
    <div
        id={lastElement ? 'last-message' : ''}
        className={
            'chat-message__container' + (isUser ? ' chat-message__container--user' : ' chat-message__container--friend')
        }>
        <div className={'chat-message'}>
            <div className={'chat-message__name'}>
                From: <span>{name}</span>
            </div>
            <div className={'chat-message__timestamp'}>At: {timestamp ? new Date(timestamp).toLocaleString() : ''}</div>
            <div className={'chat-message__content'}>Message: 
                <p>{content}</p>
            </div>
        </div>
    </div>
);

export default ChatMessage;
