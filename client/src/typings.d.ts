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
}

export interface IChatWindow {
    user?: IUser;
    friend?: IFriend;
    selectedChannel?: IChannel;
}

export interface IChatMessage {
    id?: number;
    name?: string;
    content?: string;
    timestamp?: string;
    isUser?: boolean;
}
