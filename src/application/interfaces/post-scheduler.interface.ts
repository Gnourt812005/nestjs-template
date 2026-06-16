export const POST_SCHEDULER_SERVICE = Symbol('POST_SCHEDULER_SERVICE');

export interface IPostSchedulerService {
  schedule(outputId: string, scheduledAt: Date): Promise<void>;
  updateSchedule(outputId: string, scheduledAt: Date): Promise<void>;
  revoke(outputId: string): Promise<void>;
}
