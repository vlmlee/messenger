import * as React from 'react';
import { IChatMessage } from 'typings';

const ChatMessage = ({ name, content, timestamp, isUser }: IChatMessage) => (
    <div
        className={
            'chat-message__container' + (isUser ? ' chat-message__container--user' : ' chat-message__container--friend')
        }>
        <div className={'chat-message'}>
            <div className={'chat-message__name'}>From: {name}</div>
            <div className={'chat-message__timestamp'}>At: {timestamp}</div>
            <div className={'chat-message__content'}>Message: {content}</div>
        </div>
    </div>
);

export default ChatMessage;
