export interface IChannel {
    id?: number;
    createdBy?: string;
    participants?: string[];
    messages?: IChatMessage[];
    user?: IUser;
    friend?: IFriend;
}

export interface IFriend {
    id?: number;
    name?: string;
}

export interface IUser {
    id?: number;
    name?: string;
}

export interface ISidebar {
    channels: IChannel[];
    selectChannel: (id?: number) => void;
    selectedChannelId?: number;
    onCreateChannel?: () => void;
    creatingChannel?: boolean;
    disabled?: boolean;
}

export interface IChatWindow {
    user?: IUser;
    friend?: IFriend;
    users?: IUser[];
    selectedChannel?: IChannel;
    loading?: boolean;
    disabled?: boolean;
}

export interface IEnterNameModal {
    onSubmit: (name: string) => Promise<void> | void;
    submitting?: boolean;
    error?: string;
}

export interface IChatMessage {
    id?: number;
    name?: string;
    content?: string;
    timestamp?: string;
    fromUser?: number;
    toUser?: number;
    channelId?: number;
    isUser?: boolean;
    lastElement?: boolean;
}
