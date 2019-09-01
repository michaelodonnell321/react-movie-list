const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const moviesRouter = require('./routes/movies.router');
const detailsRouter = require('./routes/details.router');
const editRouter = require('./routes/edit.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/movies', moviesRouter);
app.use('/api/details', detailsRouter);
app.use('/api/edit', editRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});