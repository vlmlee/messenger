import { Query, Resolver } from '@nestjs/graphql';
import { Channel } from './entity/channels.entity';
import { ChannelService } from './channels.service';

@Resolver(of => Channel)
export class ChannelResolver {
    constructor(private channelService: ChannelService) {}

    @Query(returns => [Channel])
    async getAllChannels(): Promise<Channel[]> {
        return await this.channelService.getAllChannels();
    }
}
