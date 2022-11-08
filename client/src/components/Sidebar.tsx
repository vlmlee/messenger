import * as React from 'react';
import Channel from '~components/Channel';
import { ISidebar } from 'typings';

const Sidebar = ({ channels }: ISidebar) => {
    return (
        <div>
            {channels.map(() => (
                <Channel />
            ))}
        </div>
    );
};

export default Sidebar;
