import { BuildinAuthMiddleware } from './buildin-auth.middleware';

describe('BuildinAuthMiddleware', () => {
  it('미들웨어 정의 확인', () => {
    expect(new BuildinAuthMiddleware()).toBeDefined();
    expect(new BuildinAuthMiddleware().use).toBeDefined();
  });

  it('미들웨어가 원하는 형태로 동작하는지 확인', async () => {
    // create mock request, response, next function
    const req = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxNGYwNGM0LWQ3M2MtNGY1NC05NDQ2LWM3NWIzYTJmM2JjNSIsImV4cCI6MTY4MTAyNjIzOH0.tXY0_LKSFajiEEkT2hwQTAvG3_f5dRImJv5jB3flo6q',
      },
      userId: undefined,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    // call middleware
    const middleware = new BuildinAuthMiddleware();
    const middlewareRes = await middleware.use(req as never, res as never, next);

    // check 'userId' property is added to request
    expect(middlewareRes).toBeDefined();
    expect(middlewareRes).toBe('314f04c4-d73c-4f54-9446-c75b3a2f3cb5');
  });
});
