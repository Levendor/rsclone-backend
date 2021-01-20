import { Collection, MongoClient } from 'mongodb';
require('dotenv').config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`;

const dbName: string = 'game';

const changeCollection = (collection: string): void => {
  collectionName = collection;
}

let collectionName: string = 'userProfiles';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);

  return client.db(dbName);
}

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();

  return db.collection(collectionName);
}

const listAll = async () => {
  const collection = await getCollection();

  return collection.find({}).toArray();
};

const getById = async (id: string) => {
  const collection = await getCollection();

  return await collection.findOne({ id });
};

const create = async (item) => {
  const collection = await getCollection();

  const response = await collection.insertOne(item);

  return response.ops[0];
};

const update = async (item) => {
  const collection = await getCollection();

  const id = item.id;

  const response = await collection.replaceOne({ id }, item);

  return response.ops[0];
};

const remove = async (id: string) => {
  const collection = await getCollection();

  return collection.deleteOne({ id });
};

export {
  listAll,
  getById,
  create,
  update,
  remove,
  changeCollection,
}