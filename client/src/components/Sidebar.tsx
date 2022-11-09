import * as React from 'react';
import Channel from './Channel';
import { ISidebar } from 'typings';

const Sidebar = ({ channels }: ISidebar) => {
    return (
        <div className={'sidebar'}>
            {channels.map(() => (
                <Channel />
            ))}
            <div className={'sidebar__background'} />
        </div>
    );
};

export default Sidebar;
