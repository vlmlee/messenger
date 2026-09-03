import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Channel } from './entity/channels.entity';
import { ChannelService } from './channels.service';
import { NewChannel } from './dto/newChannel.dto';

@Resolver(of => Channel)
export class ChannelResolver {
    constructor(private channelService: ChannelService) {}

    @Query(returns => [Channel])
    async getAllChannels(): Promise<Channel[]> {
        return await this.channelService.getAllChannels();
    }

    @Query(returns => Channel, { nullable: true })
    async getChannel(@Args('id', { type: () => Int }) id: number): Promise<Channel | null> {
        return await this.channelService.getChannel(id);
    }

    @Mutation(returns => Channel)
    async createChannel(@Args('channel') channel: NewChannel): Promise<Channel> {
        return await this.channelService.createChannel(channel.createdBy);
    }

    @Mutation(returns => Channel)
    async removeChannel(@Args('id', { type: () => Int }) id: number): Promise<Channel> {
        return await this.channelService.removeChannel(id);
    }

    @Mutation(returns => Channel)
    async joinChannel(
        @Args('id', { type: () => Int }) id: number,
        @Args('userId', { type: () => Int }) userId: number
    ): Promise<Channel> {
        return await this.channelService.joinChannel(id, userId);
    }

    @Mutation(returns => Channel)
    async leaveChannel(
        @Args('id', { type: () => Int }) id: number,
        @Args('userId', { type: () => Int }) userId: number
    ): Promise<Channel> {
        return await this.channelService.leaveChannel(id, userId);
    }
}
