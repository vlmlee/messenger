import * as React from 'react';
import Sidebar from '~components/Sidebar';
import ChatWindow from '~components/ChatWindow';
import { useState } from 'react';
import { IUser, IChannel, IFriend } from './typings';

export default () => {
    const [user, setUser] = useState<IUser>({});
    const [friend, setFriend] = useState<IFriend>({});
    const [channels, setChannels] = useState<IChannel[]>([]);

    return (
        <main>
            <Sidebar channels={channels} />
            <ChatWindow friend={friend} />
        </main>
    );
};
