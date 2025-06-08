import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler =
  <Params = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<Params, ResBody, ReqBody, ReqQuery>,
      res: Response<ResBody>,
      next: NextFunction
    ) => Promise<any>
  ): RequestHandler<Params, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) =>
    fn(req, res, next).catch(next);

export default asyncHandler;
