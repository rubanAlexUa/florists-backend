import createHttpError from 'http-errors';

export const parseFlowers = (req, res, next) => {
  if (typeof req.body.flowers === 'string') {
    try {
      req.body.flowers = JSON.parse(req.body.flowers);
    } catch {
      return next(createHttpError(400, 'flowers mst be valid JSON'));
    }
  }
  next();
};
