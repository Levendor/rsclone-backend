import { Router } from 'express';
import * as storage from './mongo';

const router = Router();

router.get('/:collection/', async (req, res, next) => {
  storage.changeCollection(req.params.collection);
  const list = await storage.listAll();

  res.json(list);
});

router.get('/:collection/:id', async (req, res, next) => {
  storage.changeCollection(req.params.collection);
  const item =  await storage.getById(req.params.id);

  res
    .status(item ? 200 : 404)
    .json(item ?? {
      statusCode: 404
    });
});

router.post('/:collection/', async (req, res, next) => {
  storage.changeCollection(req.params.collection);
  const id = req.body.id;

  const { body } = req;

  body.id = id;

  const newBody = await storage.create(body);

  res.json(newBody);
});

router.put('/:collection/:id', async (req, res, next) => {
  storage.changeCollection(req.params.collection);
  const { body } = req;

  const newBody = await storage.update({
    ...body,
    id: req.body.id,
  });

  res.json(newBody);
});

router.delete('/:collection/:id', async(req, res, next) => {
  storage.changeCollection(req.params.collection);
  await storage.remove(req.params.id);

  res
    .status(204)
    .json(null);
});

export default router;