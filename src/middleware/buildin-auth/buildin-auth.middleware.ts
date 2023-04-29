import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

import { setting } from '@/setting';

const BUILDIN_AUTH_ROOT = setting.authServer.authURL;

@Injectable()
export class BuildinAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      res.status(401).send('Unauthorized with a wrong token format.');
      return;
    }
    try {
      const userIdResponse = await axios.get<{
        code: number;
        message: string;
        'user-id': string;
      }>(`${BUILDIN_AUTH_ROOT}/info/checkUser`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      req.userId = userIdResponse.data['user-id'];
      next();
      return req.userId;
    } catch (err) {
      // check http error code is 500
      if (err.response.status === 498) {
        res.status(498).send('Unauthorized with a wrong token.');
        return;
      }
      res.status(500).send('Internal server error.');
      return;
    }
  }
}
