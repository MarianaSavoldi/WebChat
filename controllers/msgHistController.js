const msgModel = require('../models/msgHistory');

const getAll = async (req, res) => {
  try {
    // const { time, nickname, message } = req.body;rs
    const getAllMessages = await msgModel.history();
    console.log('getAll', getAllMessages);
    return res.status(200).send(getAllMessages);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Sorry, something went wrong :(');
  }
};

module.exports = {
  getAll,
}; 