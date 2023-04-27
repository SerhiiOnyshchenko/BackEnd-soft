const {
	createMovie,
	updateMovieById,
	removeMovie,
	getMovieById,
	getMoviesByOwnerId,
} = require('../services/moviesService');
const ObjectId = require('mongoose').Types.ObjectId;

const getMoviesByOwnerIdController = async (req, res) => {
	const { page = 1, limit = 10, ownerId } = req.query;
	const data = await getMoviesByOwnerId(page, limit, ownerId);
	res.status(201).json(data);
};

const getMovieByIdController = async (req, res) => {
	const { movieId } = req.params;
	const data = await getMovieById(movieId);
	res.status(201).json({ data });
};

const addMovieController = async (req, res) => {
	const { title, director, dateRelease } = req.body;
	const { id } = req.user;

	const data = await createMovie({
		title,
		director,
		dateRelease,
		ownerId: ObjectId(id),
	});
	res.status(201).json({ data });
};

const updateMovieController = async (req, res) => {
	const { movieId } = req.params;
	const ownerId = req.user.id;
	const { title, director, dateRelease } = req.body;
	const data = await updateMovieById({
		title,
		director,
		dateRelease,
		ownerId,
		movieId,
	});
	res.json({ data });
};

const removeMovieController = async (req, res) => {
	const { movieId } = req.params;
	const { id } = req.user;
	const data = await removeMovie(movieId, id);
	res.status(201).json({ data });
};

module.exports = {
	getMoviesByOwnerIdController,
	addMovieController,
	updateMovieController,
	removeMovieController,
	getMovieByIdController,
};
