require('dotenv').config();

const { Movie } = require('../db/moviesModel');
const { NoMovieError, NotOwnerError } = require('../helpers/errors');

const getMoviesByOwnerId = async (page, limit, ownerId) => {
	const skip = (page - 1) * limit;
	const movies = await Movie.find({ ownerId: ownerId }).skip(skip).limit(limit);
	const totalPages = await Movie.find({ ownerId: ownerId }).count();
	return { movies, page, totalPages };
};

const createMovie = async ({ title, director, dateRelease, ownerId }) => {
	const movie = await Movie.create({
		title,
		director,
		dateRelease,
		ownerId,
	});

	return movie;
};

const getMovieById = async movieId => {
	const movie = await Movie.findById(movieId);
	if (!movie) {
		throw new NoMovieError('Movie not found');
	}
	return movie;
};

const updateMovieById = async ({
	title,
	director,
	dateRelease,
	ownerId,
	movieId,
}) => {
	const movieOld = await Movie.findById(movieId);
	if (!movieOld) {
		throw new NoMovieError('Movie not found');
	}
	if (movieOld.ownerId.toString() !== ownerId) {
		throw new NotOwnerError('You are not owner');
	}
	const movie = await Movie.findByIdAndUpdate(
		movieId,
		{ title, director, dateRelease },
		{ new: true }
	);
	return movie;
};

const removeMovie = async (movieId, id) => {
	const movie = await Movie.findById(movieId);
	if (!movie) {
		throw new NoMovieError('Movie not found');
	}
	if (movie.ownerId.toString() !== id) {
		throw new NotOwnerError('You are not owner');
	}
	await Movie.findByIdAndDelete(movieId);
	return movie;
};

module.exports = {
	getMoviesByOwnerId,
	createMovie,
	updateMovieById,
	removeMovie,
	getMovieById,
};
