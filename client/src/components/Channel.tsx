import * as React from 'react';
import { IChannel } from '~typings';

const Channel = ({ user, friend }: IChannel) => (
    <div>
        <div>{user}</div>
        <div>{friend}</div>
    </div>
);

export default Channel;
