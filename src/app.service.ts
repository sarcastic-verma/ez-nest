import { Injectable } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from './utils/prisma.health';

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: PrismaHealthIndicator,
  ) {}

  healthCheck() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.8 }), // if storage utilisation above 60%, it will show unhealthy
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // if heap reaches 150 mb, it shows unhealthy
      () => this.db.isHealthy('db'),
    ]);
  }
}
