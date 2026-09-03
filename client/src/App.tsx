import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import EnterNameModal from './components/EnterNameModal';
import { IChannel, IUser } from 'typings';
import './stylesheets/global.scss';
import { gql, useMutation, useQuery } from '@apollo/client';

const CURRENT_USER_KEY = 'messenger:currentUser';

const GET_ALL_USERS = gql`
    query GetUsers {
        getAllUsers {
            id
            name
            messages {
                id
                content
                fromUser
                toUser
                createdAt
            }
        }
    }
`;

const CREATE_USER = gql`
    mutation CreateUser($user: NewUserInput!) {
        createUser(user: $user) {
            id
            name
        }
    }
`;

const GET_ALL_CHANNELS = gql`
    query GetAllChannels {
        getAllChannels {
            id
            createdBy
            participants
        }
    }
`;

const readStoredUser = (): IUser | null => {
    try {
        const stored = localStorage.getItem(CURRENT_USER_KEY);
        return stored ? (JSON.parse(stored) as IUser) : null;
    } catch {
        return null;
    }
};

export default () => {
    const { loading, data } = useQuery(GET_ALL_USERS, {
        pollInterval: 500
    });
    const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_ALL_USERS }]
    });
    const [currentUser, setCurrentUser] = useState<IUser | null>(readStoredUser);
    const [modalError, setModalError] = useState('');
    const { loading: channelsLoading, data: channelsData } = useQuery(GET_ALL_CHANNELS);
    const channels = channelsData?.getAllChannels ?? [];

    const [selectedChannel, setSelectedChannel] = useState<IChannel>({});
    const hasValidatedSession = useRef(false);

    const users = data?.getAllUsers ?? [];
    const user = users.find((u: any) => u.id === currentUser?.id) ?? currentUser;
    const friend = users.find((u: any) => u.id !== currentUser?.id);

    const selectChannel = (id?: number) => {
        if (id !== undefined || id !== null) {
        }
    };

    const handleEnterName = async (name: string) => {
        setModalError('');
        try {
            const result = await createUser({
                variables: {
                    user: { name }
                }
            });
            const created = result.data?.createUser;
            if (!created) {
                setModalError('Could not create user.');
                return;
            }
            setCurrentUser(created);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: created.id, name: created.name }));
        } catch {
            setModalError('Could not create user.');
        }
    };

    useEffect(() => {
        if (!data || hasValidatedSession.current) {
            return;
        }
        hasValidatedSession.current = true;
        if (!currentUser) {
            return;
        }
        const exists = data.getAllUsers.some((u: any) => u.id === currentUser.id);
        if (!exists) {
            setCurrentUser(null);
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }, [data, currentUser]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        setSelectedChannel((_: any) => {
            return {
                id: 0,
                user: {
                    id: user?.id || 0,
                    name: user?.name || ''
                },
                friend: {
                    id: friend?.id || 0,
                    name: friend?.name || ''
                },
                messages: [...(user?.messages ?? []), ...(friend?.messages ?? [])]
                    .sort((a: any, b: any) => {
                        const timestamp1 = new Date(b.createdAt);
                        const timestamp2 = new Date(a.createdAt);
                        return timestamp2.getTime() - timestamp1.getTime();
                    })
                    .map((m: any) => {
                        return {
                            ...m,
                            timestamp: m.createdAt
                        };
                    })
            };
        });
    }, [data, currentUser]);

    return (
        <main className={'App'}>
            <Sidebar channels={channels} selectChannel={selectChannel} />
            <ChatWindow loading={loading} selectedChannel={selectedChannel} disabled={!currentUser} />
            {!currentUser ? (
                <EnterNameModal onSubmit={handleEnterName} submitting={creatingUser} error={modalError} />
            ) : null}
        </main>
    );
};
