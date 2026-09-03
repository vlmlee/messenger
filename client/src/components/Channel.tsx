import * as React from 'react';
import { IChannel } from '../typings';
import { IUser } from '../typings';

interface IChannelComponent extends IChannel {
    id?: number;
    createdBy?: string;
    participants?: string[];
    selectChannel: (id?: number) => void;
}

const Channel = ({ id, createdBy, participants, selectChannel }: IChannelComponent) => (
    <div className={'channel'} onClick={() => selectChannel(id)}>
        <div>Channel id: &#91;{id}&#93;</div>
        <div className={'channel__user'}> Created by: &#91;{createdBy}&#93; (You)</div>
        <div className={'channel__friend'}> Participants: {participants?.map((p: string) => <p key={p}> &gt; &#91;{p}&#93;</p>)}</div>
    </div>
);

export default Channel;
