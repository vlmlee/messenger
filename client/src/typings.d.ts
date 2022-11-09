export interface IChannel {
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
}

export interface IChatWindow {
    user?: IUser;
    friend?: IFriend;
}

export interface IChatMessage {
    id?: number;
    name?: string;
    content?: string;
    timestamp?: string;
    isUser?: boolean;
}
