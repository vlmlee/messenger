import * as React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { IChannel, IFriend, IUser } from 'typings';
import './stylesheets/global.scss';

export default () => {
    const [user, setUser] = useState<IUser>({});
    const [friend, setFriend] = useState<IFriend>({});
    const [channels, setChannels] = useState<IChannel[]>([]);

    return (
        <main className={'App'}>
            <Sidebar channels={channels} />
            <ChatWindow user={user} friend={friend} />
        </main>
    );
};
