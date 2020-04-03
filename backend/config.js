module.exports = {
  port: 8080,
  database: 'mongodb://localhost/ws-chat',
  dbConfig: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
};