export interface IChannel {
    user?: string;
    friend?: string;
}

export interface IFriend {
    name?: string;
}

export interface IUser {
    name?: string;
}

export interface ISidebar {
    channels: IChannel[];
}

export interface IChatWindow {
    friend?: string;
}

export interface IChatMessage {
    name?: string;
    content?: string;
}
