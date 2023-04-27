const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false }
);

const registerSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'ua'] },
		})
		.required(),
	password: Joi.string().min(7).max(32).required(),
});

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'ua'] },
		})
		.required(),
	password: Joi.string().min(7).required(),
});

const schemas = {
	registerSchema,
	loginSchema,
};

const User = model('users', userSchema);

module.exports = {
	User,
	schemas,
};
