/**
 * Frontier Auth SDK
 * Main entry point for authentication SDK
 */

import { Client } from './client.js';
import { Account } from './services/account.js';

export class FrontierAuth {
  public client: Client;
  public account: Account;

  constructor() {
    this.client = new Client();
    this.account = new Account(this.client);
  }

  /**
   * Set the API endpoint
   */
  setEndpoint(endpoint: string): FrontierAuth {
    this.client.setEndpoint(endpoint);
    return this;
  }

  /**
   *set API key
   
   */

  setapikey(api_key:string):FrontierAuth {
   this.client.setkey(api_key);
   return this;
  }

  /**
   * Set the project ID
   */
  setProject(projectId: string): FrontierAuth {
    this.client.setProject(projectId);
    return this;
  }

  /**
   * Set the API key for server-side usage
   */
  setKey(key: string): FrontierAuth {
    this.client.setKey(key);
    return this;
  }

  /**
   * Set JWT token for authenticated requests
   */
  setJWT(jwt: string): FrontierAuth {
    this.client.setJWT(jwt);
    return this;
  }
}

export { Client } from './client.js';
export { Account } from './services/account.js';
export * from './types/types.js';
export * from './exceptions/exception.js';

export default FrontierAuth;