const express = require('express');

const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  try{
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = new User(userData);

    user.generateToken();

    await user.save();

    res.send(user);
  }catch(error){
    return res.status(400).send(error)
  }
});

router.post('/sessions', async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username});

    if(!user) return res.send(400).send({error: 'No such user'});

    const isMatch = await user.comparePasswords(req.body.password);

    if(!isMatch) return res.status(400).send({error: 'Invalid password'});

    user.generateToken();

    await user.save();

    res.send(user);
  }catch(error){
    res.status(400).send(error)
  }
});

router.delete('/sessions', auth, async (req, res) => {
  const success = {message: "Success"};

  try{
    const token = req.get("Authorization").split(' ')[1];

    if(!token) return res.send(success);

    const user = await User.findOne({token});

    if(!user) return res.send(success);

    user.generateToken();

    await user.save();

    res.send(success);
  }catch(error){
    res.status(400).send(error);
  }
});

module.exports = router;