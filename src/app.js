const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/apiHelps');

const userRouter = require('./routes/api/user');
const movieRouter = require('./routes/api/movie');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/movie', movieRouter);

app.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes: /user ',
		data: 'Not found',
	});
});
app.use(errorHandler);

module.exports = app;
