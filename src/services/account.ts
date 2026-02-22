/**
 * Account service for user authentication
 */

import { Client } from '../client.js';
import { User, Session } from '../types/types.js';

export class Account {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Create account (Sign up)
   */
  async create(userId: string, email: string, password: string, name?: string): Promise<User> {
    return await this.client.call('POST', '/account', {}, {
      userId,
      email,
      password,
      name
    });
  }

  /**
   * Create email session (Login)
   */
  async createEmailSession(email: string, password: string): Promise<Session> {
    return await this.client.call('POST', '/account/sessions/email', {}, {
      email,
      password
    });
  }
}