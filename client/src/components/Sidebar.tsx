import * as React from 'react';
import Channel from './Channel';
import { IChannel, ISidebar } from '../typings';

const Sidebar = ({
    channels,
    selectChannel,
    selectedChannelId,
    onCreateChannel,
    creatingChannel,
    disabled,
    currentUser
}: ISidebar) => {
    return (
        <div className={'sidebar crt'}>
            <div className={'sidebar__channels'}>
                {channels.sort((a: IChannel, b: IChannel) => (a.id ?? 0) - (b.id ?? 0)).map((c: IChannel) => {
                    return (
                        <Channel
                            key={c.id}
                            id={c.id}
                            createdBy={c.createdBy}
                            participants={c.participants}
                            selectChannel={selectChannel}
                            isSelected={c.id === selectedChannelId}
                            currentUser={currentUser}
                        />
                    );
                })}
            </div>
            <button
                className={'sidebar__create-channel'}
                type={'button'}
                onClick={onCreateChannel}
                disabled={disabled || creatingChannel}>
                {creatingChannel ? 'Creating...' : 'Create channel'}
            </button>
            <div className={'sidebar__background'} />
        </div>
    );
};

export default Sidebar;
