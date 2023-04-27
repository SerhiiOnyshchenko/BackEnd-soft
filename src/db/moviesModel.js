const { Schema, model } = require('mongoose');
const ObjectId = require('mongoose').Schema.Types.ObjectId;
const Joi = require('joi').extend(require('@joi/date'));

const moviesSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		director: {
			type: String,
			required: true,
		},
		dateRelease: {
			type: String,
			required: true,
		},
		ownerId: {
			type: ObjectId,
			required: true,
		},
	},
	{ versionKey: false }
);

const createMovieSchema = Joi.object({
	title: Joi.string().min(2).max(16).required(),
	director: Joi.string().min(2).max(16).required(),
	dateRelease: Joi.date()
		.utc()
		.format(['YYYY/MM/DD', 'DD-MM-YYYY'])
		.max('now')
		.messages({
			'date.format': `Date format is DD-MM-YYYY`,
			'date.max': `Date must be earlier then today`,
		})
		.required(),
});

const updateMovieSchema = Joi.object({
	title: Joi.string().min(2).max(16),
	director: Joi.string().min(2).max(16),
	dateRelease: Joi.date()
		.utc()
		.format(['YYYY/MM/DD', 'DD-MM-YYYY'])
		.max('now')
		.messages({
			'date.format': `Date format is DD-MM-YYYY`,
			'date.max': `Date must be earlier then today`,
		}),
});

const schemasMovie = {
	createMovieSchema,
	updateMovieSchema,
};

const Movie = model('movies', moviesSchema);

module.exports = {
	Movie,
	schemasMovie,
};
