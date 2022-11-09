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
            messagesFrom {
                id
                content
                fromUser
                toUser
                DateTime
            }
            friends
        }
    }
`;

export default () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS, {
        pollInterval: 500
    });

    const user = data
        ? data.getAllUsers.find((user: any) => user.name === 'Alice') || data.getAllUsers[0]
        : {
              name: 'Alice',
              id: 14
          };

    const friend = data
        ? data.getAllUsers.find((user: any) => user.name === 'Bob') || data.getAllUsers[1]
        : {
              name: 'Bob',
              id: 15
          };

    const [selectedChannel, setSelectedChannel] = useState<IChannel>({});

    const selectChannel = (id?: number) => {
        if (id !== undefined || id !== null) {
        }
    };

    useEffect(() => {
        if (data) {
            setSelectedChannel((_: any) => {
                return {
                    id: 0,
                    user: {
                        id: user.id,
                        name: user.name
                    },
                    friend: {
                        id: friend.id,
                        name: friend.name
                    },
                    messages: [...user.messagesFrom, ...friend.messagesFrom]
                        .sort((a: any, b: any) => {
                            const timestamp1 = new Date(b.DateTime);
                            const timestamp2 = new Date(a.DateTime);
                            return timestamp2.getTime() - timestamp1.getTime();
                        })
                        .map((m: any) => {
                            return {
                                ...m,
                                timestamp: m.DateTime
                            };
                        })
                };
            });
        }
    }, [data]);

    return (
        <main className={'App'}>
            <Sidebar channels={[selectedChannel]} selectChannel={selectChannel} />
            <ChatWindow loading={loading} selectedChannel={selectedChannel} />
        </main>
    );
};
