import 'express';

declare global {
  namespace Express {
    interface Request {
      clientId?: string;
    }
  }
}

export {};
