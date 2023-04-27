const express = require('express');
const {
	registrationController,
	loginController,
	logoutController,
	getCurrentUserController,
} = require('../../controllers/usersController');
const {
	registerUserValidation,
	loginUserValidation,
} = require('../../middlewares/validationMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelps');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const router = new express.Router();

router
	.route('/registration')
	.post(registerUserValidation, asyncWrapper(registrationController));

router.route('/login').post(loginUserValidation, asyncWrapper(loginController));
router.route('/logout').post(authMiddleware, asyncWrapper(logoutController));
router
	.route('/current')
	.get(authMiddleware, asyncWrapper(getCurrentUserController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /user',
		data: 'Not found',
	});
});

module.exports = router;
