const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const expressWs = require('express-ws');

const config = require('./config');
const users = require('./app/users');
const messages = require('./app/messages');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
expressWs(app);

app.use(express.json());
app.use(cors());

const connections = {};

const run = async () => {
  await mongoose.connect(config.database, config.dbConfig);

  app.use('/users', users);
  app.use('/messages', messages);

  app.ws('/chat', async function(ws, req){
    const token = req.query.token;
    if(!token) throw new Error('User not authorized');

    console.log(token);

    const user = await User.findOne({token});
    if(!user) throw new Error('User not authorized');

    const wsId = nanoid();
    connections[wsId] = ws;

    console.log(`${user.username} connected, Total connections: ${Object.keys(connections).length}`);

    const messages = await Message.find().populate({path: 'user', select: 'username'});

    console.log(messages);

    // messages.slice(-30);

    ws.send(JSON.stringify({
      type: 'LAST_MESSAGES',
      messages
    }));

    ws.on('message', async (msg) => {
      const parsed = JSON.parse(msg);

      switch(parsed.type){
        case 'CREATE_MESSAGE':
          const messageData = {
            user: user._id,
            text: parsed.text,
          };

          const message = new Message(messageData);

          await message.save();

          Object.keys()

          ws.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            ...message,
          }));

          break;
        default:
          console.log('No type ' + parsed.type);
      }
    });

    ws.on('close', (msg) => {
      delete connections[wsId];

      console.log(`${user.username} disconnected, Total connections: ${Object.keys(connections).length}`);
    })
  });

  app.listen(config.port, () => {
    console.log('Please try ', config.port)
  })
};

run().catch(error => {
  console.log(error)
});