const Joi = require('joi');
const { schemas } = require('../db/usersModel');
const { schemasMovie } = require('../db/moviesModel');
const { WrongBodyError, ValidationError } = require('../helpers/errors');

const validateObjectId = (req, res, next) => {
	const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
	const validId = schema.validate(req.params.id);
	if (validId.error) {
		return next(new WrongBodyError('Not found'));
	}
};

module.exports = {
	getByIdValidate: (req, res, next) => {
		validateObjectId(req, res, next);
		next();
	},
	registerUserValidation: (req, res, next) => {
		const validationResult = schemas.registerSchema.validate(req.body);
		if (validationResult.error) {
			next(new ValidationError(validationResult.error.details[0].message));
		}
		next();
	},
	loginUserValidation: (req, res, next) => {
		const validationResult = schemas.loginSchema.validate(req.body);
		if (validationResult.error) {
			next(new ValidationError(validationResult.error.details[0].message));
		}
		next();
	},
	addMoviesValidation: (req, res, next) => {
		const validationResult = schemasMovie.createMovieSchema.validate(req.body);
		if (validationResult.error) {
			next(new ValidationError(validationResult.error.details[0].message));
		}
		next();
	},
	updateMoviesValidation: (req, res, next) => {
		const validationResult = schemasMovie.updateMovieSchema.validate(req.body);
		if (validationResult.error) {
			next(new ValidationError(validationResult.error.details[0].message));
		}
		next();
	},
};
