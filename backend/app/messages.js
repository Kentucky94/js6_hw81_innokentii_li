const express = require('express');

const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try{
    const messageData = {
      user: req.user._id,
      text: req.body.text,
    };

    const message = new Message(messageData);

    await message.save();

    res.send(message);
  }catch(error){
    res.status(400).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try{
    const messages = await Message.find().populate({path: 'user', select: 'username'});

    res.send(messages);
  }catch(error){
    res.status(400).send(error);
  }
});

module.exports = router;