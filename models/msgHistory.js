const connection = require('./connection');

const create = async ({ time, nickname, chatMessage }) => {
  const db = await connection();
  const messages = await db
    .collection('messages')
    .insertOne({ time, nickname, chatMessage });
  return messages;
};

const history = async () => {
  const db = await connection();
  const getHist = await db.collection('messages').find({}).toArray();
  return getHist;
};

module.exports = {
  create,
  history,
};