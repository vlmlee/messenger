import * as React from 'react';
import { IChannel } from '../typings';

interface IChannelComponent extends IChannel {
    selectChannel: (id?: number) => void;
}

const Channel = ({ id, user, friend, selectChannel }: IChannelComponent) => (
    <div className={'channel'} onClick={() => selectChannel(id)}>
        <div>Channel id: {id}</div>
        <div className={'channel__user'}> &gt; &#91;{user?.name}&#93; (You)</div>
        <div className={'channel__friend'}> &gt; &#91;{friend?.name}&#93;</div>
    </div>
);

export default Channel;
