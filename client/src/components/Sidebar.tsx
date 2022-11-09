import * as React from 'react';
import Channel from './Channel';
import { ISidebar, IChannel } from 'typings';

const Sidebar = ({ channels, selectChannel }: ISidebar) => {
    return (
        <div className={'sidebar'}>
            {channels.map((c: IChannel) => (
                <Channel id={c.id} user={c.user} friend={c.friend} selectChannel={selectChannel} />
            ))}
            <div className={'sidebar__background'} />
        </div>
    );
};

export default Sidebar;
