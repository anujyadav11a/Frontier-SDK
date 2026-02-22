/**
 * Custom exceptions for Frontier Auth SDK
 */

export class FrontierException extends Error {
  public code: number;
  public type: string;
  public response: any;

  constructor(message: string, code: number = 0, type: string = '', response: any = '') {
    super(message);
    this.name = 'FrontierException';
    this.code = code;
    this.type = type;
    this.response = response;
  }
}

export class AuthException extends FrontierException {
  constructor(message: string, code: number = 401, type: string = 'auth_error', response: any = '') {
    super(message, code, type, response);
    this.name = 'AuthException';
  }
}

export class NetworkException extends FrontierException {
  constructor(message: string, code: number = 0, type: string = 'network_error', response: any = '') {
    super(message, code, type, response);
    this.name = 'NetworkException';
  }
}

export class ValidationException extends FrontierException {
  constructor(message: string, code: number = 400, type: string = 'validation_error', response: any = '') {
    super(message, code, type, response);
    this.name = 'ValidationException';
  }
}