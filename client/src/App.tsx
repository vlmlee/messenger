import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import EnterNameModal from './components/EnterNameModal';
import { IChannel, IUser } from './typings';
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
                channelId
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

const CREATE_CHANNEL = gql`
    mutation CreateChannel($channel: NewChannelInput!) {
        createChannel(channel: $channel) {
            id
            createdBy
            participants
        }
    }
`;

const JOIN_CHANNEL = gql`
    mutation JoinChannel($id: Int!, $userId: Int!) {
        joinChannel(id: $id, userId: $userId) {
            id
            createdBy
            participants
        }
    }
`;

const LEAVE_CHANNEL = gql`
    mutation LeaveChannel($id: Int!, $userId: Int!) {
        leaveChannel(id: $id, userId: $userId) {
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

const mapIdToUser = (id: number, users: IUser[]) => {
    return users.find((u: IUser) => u.id === id) ?? null;
};

const lowestChannelId = (channelList: { id: number }[]): number | null => {
    if (!channelList.length) {
        return null;
    }
    return Math.min(...channelList.map(c => c.id));
};

export default () => {
    const { loading, data } = useQuery(GET_ALL_USERS, {
        pollInterval: 500
    });
    const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_ALL_USERS }]
    });
    const [createChannel, { loading: creatingChannel }] = useMutation(CREATE_CHANNEL, {
        refetchQueries: [{ query: GET_ALL_CHANNELS }]
    });
    const [joinChannel] = useMutation(JOIN_CHANNEL, {
        refetchQueries: [{ query: GET_ALL_CHANNELS }, { query: GET_ALL_USERS }]
    });
    const [leaveChannel] = useMutation(LEAVE_CHANNEL, {
        refetchQueries: [{ query: GET_ALL_CHANNELS }, { query: GET_ALL_USERS }]
    });
    const [currentUser, setCurrentUser] = useState<IUser | null>(readStoredUser);
    const [currentChannelId, setCurrentChannelId] = useState<number | null>(null);
    const [modalError, setModalError] = useState('');
    const { data: channelsData, refetch: refetchChannels } = useQuery(GET_ALL_CHANNELS, {
        pollInterval: 500
    });

    const hasValidatedSession = useRef(false);
    const switchingChannel = useRef(false);

    const users = data?.getAllUsers ?? [];
    const user = users.find((u: any) => u.id === currentUser?.id) ?? currentUser;
    const friend = users.find((u: any) => u.id !== currentUser?.id);
    const rawChannels = channelsData?.getAllChannels ?? [];
    const channels = rawChannels.map((c: any) => ({
        id: c.id,
        createdBy: mapIdToUser(c.createdBy, users)?.name ?? '',
        participants: c.participants.map((p: number) => mapIdToUser(p, users)?.name ?? '')
    }));

    const allMessages = users
        .flatMap((u: any) => u.messages ?? [])
        .sort((a: any, b: any) => {
            const timestamp1 = new Date(b.createdAt);
            const timestamp2 = new Date(a.createdAt);
            return timestamp2.getTime() - timestamp1.getTime();
        })
        .map((m: any) => ({
            ...m,
            timestamp: m.createdAt
        }));

    const selectedChannel: IChannel = {
        id: currentChannelId ?? undefined,
        user: {
            id: user?.id || 0,
            name: user?.name || ''
        },
        friend: {
            id: friend?.id || 0,
            name: friend?.name || ''
        },
        messages: allMessages
    };

    const selectChannel = async (id?: number) => {
        if (id === undefined || id === null || !currentUser?.id || switchingChannel.current) {
            return;
        }

        const target = rawChannels.find((c: any) => c.id === id);
        const alreadyIn = (target?.participants ?? []).includes(currentUser.id);

        setCurrentChannelId(id);

        if (alreadyIn) {
            return;
        }

        switchingChannel.current = true;
        try {
            if (currentChannelId != null && currentChannelId !== id) {
                await leaveChannel({
                    variables: {
                        id: currentChannelId,
                        userId: currentUser.id
                    }
                });
            }
            await joinChannel({
                variables: {
                    id,
                    userId: currentUser.id
                }
            });
        } finally {
            switchingChannel.current = false;
        }
    };

    const handleCreateChannel = async () => {
        if (!currentUser?.id) {
            return;
        }
        await createChannel({
            variables: {
                channel: {
                    createdBy: currentUser.id
                }
            }
        });
    };

    const handleEnterName = async (name: string) => {
        setModalError('');
        let created: IUser | undefined;
        try {
            const result = await createUser({
                variables: {
                    user: { name }
                }
            });
            created = result.data?.createUser;
            if (!created) {
                setModalError('Could not create user.');
                return;
            }
            setCurrentUser(created);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: created.id, name: created.name }));
        } catch {
            setModalError('Could not create user.');
            return;
        }

        try {
            const { data: latestChannels } = await refetchChannels();
            const allChannels = latestChannels?.getAllChannels ?? rawChannels;
            const lowestId = lowestChannelId(allChannels);
            if (lowestId == null || !created?.id) {
                return;
            }
            await joinChannel({
                variables: {
                    id: lowestId,
                    userId: created.id
                }
            });
            setCurrentChannelId(lowestId);
        } catch {
            // User was created; they can still join a channel from the sidebar.
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
            setCurrentChannelId(null);
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }, [data, currentUser]);

    useEffect(() => {
        if (currentChannelId != null || !currentUser?.id || !rawChannels.length) {
            return;
        }
        const participating = rawChannels.filter((c: any) =>
            (c.participants ?? []).includes(currentUser.id)
        );
        const lowestId = lowestChannelId(participating);
        if (lowestId != null) {
            setCurrentChannelId(lowestId);
        }
    }, [currentUser, rawChannels, currentChannelId]);

    return (
        <main className={'App'}>
            <Sidebar
                channels={channels}
                selectChannel={selectChannel}
                selectedChannelId={currentChannelId ?? undefined}
                onCreateChannel={handleCreateChannel}
                creatingChannel={creatingChannel}
                disabled={!currentUser}
            />
            <ChatWindow
                loading={loading}
                selectedChannel={selectedChannel}
                users={users}
                disabled={!currentUser}
            />
            {!currentUser ? (
                <EnterNameModal onSubmit={handleEnterName} submitting={creatingUser} error={modalError} />
            ) : null}
        </main>
    );
};
