const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./router/admin-routes');
const authRoutes = require('./router/auth-routes');
const helmet = require('helmet');
const compression = require('compression');
const morgan =  require('morgan');
const fs = require('fs');
const path = require('path');


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

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: logStream}));

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

mongoose.connect(`${process.env.MONGO_DB_KEY}`).then(() => {
  const server = app.listen(8080);
  const socketIO = require('./socket').init(server);
  socketIO.on('connection', socket => {
    console.log('Client Connected');
  });
}
).catch((err) => console.log(err))




