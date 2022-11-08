import * as React from 'react';
import { IChannel } from '~typings';

const Channel = ({ user, friend }: IChannel) => (
    <div>
        <div>{user?.name}</div>
        <div>{friend?.name}</div>
    </div>
);

export default Channel;
