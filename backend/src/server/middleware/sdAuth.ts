import express from 'express';

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): express.Response | void {
  const { token } = req.query as { [key: string]: string | undefined };
  if (!token) {
    res.sendStatus(400);
    return;
  }
  if (token !== process.env.STREAMDECK_TOKEN) {
    res.sendStatus(401);
    return;
  }
  next();
}
