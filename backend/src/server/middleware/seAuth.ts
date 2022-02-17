import express from 'express';

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): express.Response | void {
  const { token } = req.query;
  if (!token || token !== process.env.STREAMELEMENTS_TOKEN) {
    res.sendStatus(401);
    return;
  }
  next();
}
