/**
 * HTTP Client for API communication
 */

export interface ClientConfig {
  api_key?:string
  endpoint?: string;
  project_id?: string;
  key?: string;
  jwt?: string;
  locale?: string;
}

export class Client {
  private config: ClientConfig = {};
  private headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-sdk-name': 'Frontier',
    'x-sdk-platform': 'client',
    'x-sdk-language': 'typescript',
    'x-sdk-version': '1.0.0',
  };

  constructor(config: ClientConfig = {}) {
    this.config = config;
    this.setEndpoint(config.endpoint || 'http://localhost:8000');
    this.setProject(config.project_id || '');
    this.setKey(config.key || '');
    this.setJWT(config.jwt || '');
    this.setLocale(config.locale || 'en');
  }

  /**
   * Set API endpoint
   */
  setEndpoint(endpoint: string): Client {
    this.config.endpoint = endpoint;
    return this;
  }
 

  /**
   * Set project ID
   */
  setProject(project: string): Client {
    this.config.project_id = project;
    this.addHeader('X-Frontier-Project', project);
    return this;
  }

  /**
   * Set API key
   */
  setKey(key: string): Client {
    this.config.key = key;
    this.addHeader('X-Frontier-Key', key);
    return this;
  }

  /**
   * Set JWT token
   */
  setJWT(jwt: string): Client {
    this.config.jwt = jwt;
    this.addHeader('X-Frontier-JWT', jwt);
    return this;
  }

  /**
   * Set locale
   */
  setLocale(locale: string): Client {
    this.headers['X-Frontier-Locale'] = locale;
    return this;
  }

  /**
   * Add custom header
   */
  addHeader(key: string, value: string): Client {
    this.headers[key] = value;
    return this;
  }

  /**
   * Make HTTP request
   */
  async call(
    method: string,
    path: string = '',
    headers: Record<string, string> = {},
    params: Record<string, any> = {}
  ): Promise<any> {
    const url = new URL(this.config.endpoint + path);
    const options: RequestInit = {
      method: method.toUpperCase(),
      headers: { ...this.headers, ...headers },
    };

    if (method.toUpperCase() === 'GET') {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          url.searchParams.append(key, params[key]);
        }
      });
    } else {
      options.body = JSON.stringify(params);
    }

    try {
      const response = await fetch(url.toString(), options);
      
      let data: any;
      try {
        data = await response.json();
      } catch {
        // If response is not JSON, use empty object
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}