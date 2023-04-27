const {
	registration,
	login,
	logout,
	getCurrentUser,
} = require('../services/usersService');

const registrationController = async (req, res) => {
	const { username, email, password } = req.body;
	const user = await registration({ username, email, password });
	res.status(201).json(user);
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	const user = await login({ email, password });
	res.json(user);
};

const logoutController = async (req, res) => {
	const { id } = req.user;
	await logout(id);
	res.status(204).json();
};

const getCurrentUserController = async (req, res) => {
	const { id } = req.user;
	const user = await getCurrentUser(id);
	res.json(user);
};

module.exports = {
	registrationController,
	loginController,
	logoutController,
	getCurrentUserController,
};
