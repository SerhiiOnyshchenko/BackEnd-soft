require('dotenv').config();

const secret = process.env.SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/usersModel');
const { NoAuthorizedError, AuthConflictError } = require('../helpers/errors');

const findUserByEmail = async email => {
	const user = await User.findOne({ email: { $regex: email, $options: 'i' } });
	return user;
};

const registration = async ({ username, email, password }) => {
	const user = await findUserByEmail(email);
	if (user) {
		throw new AuthConflictError('Email is already in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);
	await User.create({
		email,
		password: hashPassword,
		username,
	});

	return await login({ email, password });
};

const login = async ({ email, password }) => {
	let user = await findUserByEmail(email);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new NoAuthorizedError('Email or password is wrong');
	}
	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, secret, { expiresIn: '24h' });
	await User.findByIdAndUpdate(user._id, { token });
	user = await User.findById(user._id);
	return user;
};

const logout = async id => {
	const user = await User.findById(id);
	if (!user) {
		throw new NoAuthorizedError('Not authorized');
	}
	await User.findByIdAndUpdate(id, { token: null });
};

const getCurrentUser = async id => {
	const user = await User.findById(id);
	return user;
};

module.exports = {
	registration,
	login,
	logout,
	getCurrentUser,
};
