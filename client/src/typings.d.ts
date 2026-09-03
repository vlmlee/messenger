export interface IChannel {
    id?: number;
    user?: IUser;
    friend?: IFriend;
    messages?: IChatMessage[];
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
    onCreateChannel?: () => void;
    creatingChannel?: boolean;
    disabled?: boolean;
}

export interface IChatWindow {
    user?: IUser;
    friend?: IFriend;
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
    isUser?: boolean;
    lastElement?: boolean;
}
