import * as React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { IChannel, IUser } from 'typings';
import './stylesheets/global.scss';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_USERS = gql`
    query GetUsers {
        getAllUsers {
            id
            name
            messages {
                content
                userId
            }
        }
    }
`;

export default () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);

    console.log(data);

    const [currentUser, setCurrentUser] = useState<IUser>({
        id: 0,
        name: 'Alice'
    });

    const [channels, setChannels] = useState<IChannel[]>([
        {
            id: 0,
            user: currentUser,
            friend: {
                id: 1,
                name: 'Bob'
            },
            messages: [
                { id: 0, name: 'Alice', content: 'test', timestamp: new Date().toISOString() },
                { id: 1, name: 'Bob', content: 'hello', timestamp: new Date().toISOString() },
                { id: 0, name: 'Alice', content: 'hi', timestamp: new Date().toISOString() },
                {
                    id: 0,
                    name: 'Alice',
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    timestamp: new Date().toISOString()
                },
                {
                    id: 1,
                    name: 'Bob',
                    content:
                        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
                    timestamp: new Date().toISOString()
                }
            ]
        },
        {
            id: 1,
            user: currentUser,
            friend: {
                id: 2,
                name: 'Charlie'
            },
            messages: [
                { id: 2, name: 'Charlie', content: 'hey', timestamp: new Date().toISOString() },
                { id: 0, name: 'Alice', content: 'hello', timestamp: new Date().toISOString() },
                {
                    id: 0,
                    name: 'Alice',
                    content: "What's up?",
                    timestamp: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Charlie',
                    content: 'Nothing much',
                    timestamp: new Date().toISOString()
                }
            ]
        }
    ]);

    const [selectedChannel, setSelectedChannel] = useState<IChannel>(channels[0]);

    const selectChannel = (id?: number) => {
        if (id !== undefined || id !== null) {
            const _selectedChannel = channels.find((c: IChannel) => c.id === id);

            if (_selectedChannel) {
                setSelectedChannel(_ => _selectedChannel);
            }
        }
    };

    return (
        <main className={'App'}>
            <Sidebar channels={channels} selectChannel={selectChannel} />
            <ChatWindow selectedChannel={selectedChannel} />
        </main>
    );
};
