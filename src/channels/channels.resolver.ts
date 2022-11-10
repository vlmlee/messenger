import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Channel } from './models/channels.model';
import { ChannelService } from './channels.service';

@Resolver(of => Channel)
export class ChannelResolver {
    constructor(private channelService: ChannelService) {}
}
