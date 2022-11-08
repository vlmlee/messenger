export interface IChannel {
    user?: IUser;
    friend?: IFriend;
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
    friend?: IFriend;
}

export interface IChatMessage {
    name?: string;
    content?: string;
}
