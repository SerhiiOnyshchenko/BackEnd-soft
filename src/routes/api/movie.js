const express = require('express');
const {
	getMovieByIdController,
	addMovieController,
	updateMovieController,
	removeMovieController,
	getMoviesByOwnerIdController,
} = require('../../controllers/moviesController');
const {
	addMoviesValidation,
	updateMoviesValidation,
} = require('../../middlewares/validationMiddleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelps');

const router = new express.Router();

router
	.route('/')
	.get(authMiddleware, asyncWrapper(getMoviesByOwnerIdController))
	.post(authMiddleware, addMoviesValidation, asyncWrapper(addMovieController));
router
	.route('/:movieId')
	.get(authMiddleware, asyncWrapper(getMovieByIdController))
	.patch(
		authMiddleware,
		updateMoviesValidation,
		asyncWrapper(updateMovieController)
	)
	.delete(authMiddleware, asyncWrapper(removeMovieController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /movie',
		data: 'Not found',
	});
});

module.exports = router;
