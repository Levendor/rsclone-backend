import { Router } from 'express';
import * as storage from './mongo';

const router = Router();
const COLLECTION_NAME = 'test';

router.get('/', async (req, res, next) => {
  await storage.changeCollection(COLLECTION_NAME);
  const list = await storage.listAll();

  res.json(list);
});

router.get('/:id', async (req, res, next) => {
  await storage.changeCollection(COLLECTION_NAME);
  const item =  await storage.getById(req.params.id);

  res
    .status(item ? 200 : 404)
    .json(item ?? {
      statusCode: 404
    });
});

router.post('/', async (req, res, next) => {
  await storage.changeCollection(COLLECTION_NAME);
  const id = req.body.id;

  const { body } = req;

  body.id = id;

  const newBody = await storage.create(body);

  res.json(newBody);
});

router.put('/:id', async (req, res, next) => {
  await storage.changeCollection(COLLECTION_NAME);
  const { body } = req;

  const newBody = await storage.update({
    ...body,
    id: req.body.id,
  });

  res.json(newBody);
});

router.delete('/:id', async(req, res, next) => {
  await storage.changeCollection(COLLECTION_NAME);
  await storage.remove(req.params.id);

  res
    .status(204)
    .json(null);
});

export default router;