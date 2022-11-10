import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelService {
    constructor(private prisma: PrismaService) {}
}
