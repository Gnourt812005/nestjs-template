export interface IWebSocketService {
  /**
   * Send a message to a specific user.
   * @param userId The recipient user ID.
   * @param event The event name.
   * @param data The payload.
   */
  emitToUser<T = any>(userId: string, event: string, data: T): void;

  /**
   * Broadcast a message to all connected users in a room (e.g., enterprise room).
   * @param room The room ID.
   * @param event The event name.
   * @param data The payload.
   */
  broadcastToRoom<T = any>(room: string, event: string, data: T): void;

  /**
   * Broadcast a message to all connected users.
   * @param event The event name.
   * @param data The payload.
   */
  broadcastAll<T = any>(event: string, data: T): void;

  /**
   * Disconnect a user from the socket server.
   * @param userId The ID of the user to disconnect.
   */
  disconnectUser(userId: string): Promise<void>;
}

export const WEBSOCKET_SERVICE = Symbol('IWebSocketService');
