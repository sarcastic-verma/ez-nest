import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../helpers/prisma/prisma.service';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async get({ id }: GetUserDto): Promise<User | User[]> {
    if (!id) {
      return this.prisma.user.findMany();
    }
    let user = await this.cacheManager.get<User>(`${id}`);
    if (!user) {
      user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error('User not found');
      await this.cacheManager.set(`${id}`, user);
    }
    return user;
  }

  async create({ email, name }: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data: { email, name } });
    await this.cacheManager.set(`${user.id}`, user);
    return user;
  }

  async updateEventCount() {
    await this.prisma.user.update({
      data: { eventCount: { increment: 1 } },
      where: {}, // update all records for now
    });
  }
}
