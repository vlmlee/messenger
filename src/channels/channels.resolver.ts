import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Channel } from './entity/channels.entity';
import { ChannelService } from './channels.service';

@Resolver(of => Channel)
export class ChannelResolver {
    constructor(private channelService: ChannelService) {}
}
