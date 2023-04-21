import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const BUILDIN_AUTH_ROOT = process.env.AUTH_SERVER_INFO_URL;

@Injectable()
export class BuildinAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization.startsWith('Bearer ')) {
      res.status(401).send('Unauthorized with a wrong token format.');
      return;
    }
    try {
      const userIdResponse = await axios.get<{
        code: number;
        message: string;
        'user-id': string;
      }>(`${BUILDIN_AUTH_ROOT}/info`);
      req.userId = userIdResponse.data['user-id'];
      next();
      return req.userId;
    } catch (err) {
      // check http error code is 500
      if (err.response.status === 500) {
        res.status(401).send('Unauthorized with a wrong token.');
        return;
      }
      res.status(500).send('Internal server error.');
      return;
    }
  }
}
