const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./router/admin-routes');
const authRoutes = require('./router/auth-routes');
const dbKey = require('./databse-key');

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Header');
  next();
});

app.use('/admin/', adminRoutes);
app.use('/auth/', authRoutes);


//Error Handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});

mongoose.connect(dbKey).then(() => {
  const server = app.listen(8080);
  const socketIO = require('./socket').init(server);
  socketIO.on('connection', socket => {
    console.log('Client Connected');
  });
}
).catch((err) => console.log(err))



