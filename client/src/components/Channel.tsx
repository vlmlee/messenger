import * as React from 'react';
import { IChannel, IUser } from '../typings';

interface IChannelComponent extends IChannel {
    id?: number;
    createdBy?: string;
    participants?: string[];
    selectChannel: (id?: number) => void;
    isSelected?: boolean;
    currentUser?: IUser;
}

const Channel = ({ id, createdBy, participants, selectChannel, isSelected, currentUser }: IChannelComponent) => (
    <div
        className={'channel' + (isSelected ? ' channel--selected' : '')}
        onClick={() => selectChannel(id)}>
        <div>Channel id &#91;{id}&#93;</div>
        <div className={'channel__user'}> Created by &#91;{createdBy}&#93; {(createdBy === currentUser?.name) ? ' (You)' : ''}</div>
        <div className={'channel__friend'}>
            {' '}
            Participants: <br />
            <br />
            {participants?.filter((p: string) => p).map((p: string) => (
                <p key={p}> &gt; &#91;{p}&#93;</p>
            ))}
        </div>
    </div>
);

export default Channel;
