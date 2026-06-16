export const MESSAGE_QUEUE_SERVICE = Symbol('IMessageQueueService');
export const RABBITMQ_CIENT = Symbol('RABBITMQ_CLIENT');

export interface IMessageQueueService {
  /**
   * Emit a fire-and-forget event.
   * @param pattern The message pattern (topic/routing key).
   * @param data The payload to send.
   */
  emit<TEvent = string, TData = any>(pattern: TEvent, data: TData): void;

  /**
   * Send a request-response message.
   * @param pattern The message pattern.
   * @param data The payload to send.
   * @returns A promise resolving to the result.
   */
  send<TResult = any, TInput = any>(pattern: any, data: TInput): Promise<TResult>;
}
