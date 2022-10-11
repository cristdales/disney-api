const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const unknownRouteHandler = require('./middleware/unknownRouteHandler');
const authRouter = require('./routers/authRouter');
const charactersRouter = require('./routers/charactersRouter');
const genresRouter = require('./routers/genresRouter');
const moviesRouter = require('./routers/moviesRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use(auth);

app.use('/images', express.static('images'));

app.use('/genres', genresRouter);
app.use('/movies', moviesRouter);
app.use('/characters', charactersRouter);
app.use(unknownRouteHandler);

app.use(errorHandler);

module.exports = app;
