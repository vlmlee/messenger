import * as React from 'react';
import { IChatMessage } from 'typings';

const ChatMessage = ({ name, content }: IChatMessage) => (
    <div>
        <div>{name}</div>
        <div>{content}</div>
    </div>
);

export default ChatMessage;
