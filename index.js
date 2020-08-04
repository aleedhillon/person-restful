require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cityRouter = require('./routes/person');
const app = express();

app.use(express.json());

const serverPort = process.env.SERVER_PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/person-restful';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const db = mongoose.connection;

// db.on('errro', () => console.log('db error'));
// db.once('open', () => console.log('db success'));

app.use('/api/people', cityRouter);

app.listen(serverPort, () => console.log(`City Restful app server started at http://localhost:${serverPort}`));