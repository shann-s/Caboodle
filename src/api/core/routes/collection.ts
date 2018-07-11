import { orm } from '../models/orm';
import * as express from 'express';
import { Collection } from '../models/collection.model';

export const router = express.Router();

router.param('collectionId', (req: any, res, next, id) => {
  Collection.findById(id)
  .then(((collection) => {
    req.collection = collection;
    next();
  }))
  .catch(next);
});

router.get('/collection/categories', (req, res, next) => {
  orm.query('SELECT DISTINCT `category` FROM `Collection`', { raw: true })
  .then((result) => {
    res.json(result[0]);
  });
});

router.get('/collection/:collectionId', async (req: any, res, next) => {
  if (req.collection) {
    await req.collection.attatchEndpoints();
    res.json(req.collection);
  } else {
    next({
      status: 404,
      message: 'collection not found',
    });
  }
});

router.get('/collection', (req: any, res, next) => {
  const where: any = {};
  if (req.query.category) {
    where.category = req.query.category;
  }
  if (req.query.query) {
    where.name = {$like: `%${req.query.query}%`};
  }
  Collection.findAll({
    where: where,
    limit: req.query.limit || 200,
    offset: req.query.offset || 0
  })
  .then(collections => res.json(collections))
  .catch(next);
});
