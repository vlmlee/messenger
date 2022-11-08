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
    user?: IUser;
    friend?: IFriend;
}

export interface IChatMessage {
    name?: string;
    content?: string;
}
