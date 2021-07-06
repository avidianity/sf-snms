import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import md5 from 'md5';
import { BadRequestException } from '../exceptions/BadRequestException';
import { NotFoundException } from '../exceptions/NotFoundException';
import { Hash, Validation } from '../helpers';
import { authenticate } from '../middlewares';
import { Token } from '../models/Token';
import { User } from '../models/User';

const router = Router();

router.post('/register', [
	body('username')
		.isString()
		.withMessage('Username must be a valid string.')
		.bail()
		.notEmpty()
		.withMessage('Username is empty.')
		.bail()
		.custom(Validation.unique(User, 'username')),
	body('password').isString().withMessage('Password must be a valid string.').bail().notEmpty().withMessage('Password is empty.'),
	Validation.validate(),
	async (req: Request, res: Response) => {
		const { username, password } = req.body;

		return res.status(201).json(await User.create({ username, password: Hash.make(password) }).save());
	},
]);

router.post('/login', [
	body('username').isString().withMessage('Username must be a valid string.').bail().notEmpty().withMessage('Username is empty.'),
	body('password').isString().withMessage('Password must be a valid string.').bail().notEmpty().withMessage('Password is empty.'),
	Validation.validate(),
	async (req: Request, res: Response) => {
		const { username, password } = req.body;

		const user = await User.findOne({
			username,
		});

		if (!user) {
			throw new NotFoundException('User does not exist.');
		}

		if (!Hash.check(password, user.password)) {
			throw new BadRequestException('Password is incorrect.');
		}

		const hash = String.random(40);

		await Token.create({
			hash: md5(hash),
			user,
		}).save();

		return res.json({ user, token: hash });
	},
]);

router.get(
	'/logout',
	authenticate(async (req: Request, res: Response) => {
		await req.token?.remove();
		return res.status(204).end();
	})
);

export const auth = router;
