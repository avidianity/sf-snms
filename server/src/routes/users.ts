import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { Hash, Validation } from '../helpers';
import { authenticate } from '../middlewares';
import { User } from '../models/User';

const router = Router();

router.use(...authenticate());

router.get('/', async (_, res) => {
	return res.json(await User.find());
});

router.get('/:id', async (req, res) => {
	const user = await User.findOne(req.params.id);

	if (!user) {
		throw new NotFoundException('User does not exist.');
	}

	return res.json(user);
});

router.post('/', [
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
		const data = req.body;

		data.password = Hash.make(data.password);

		return new User(data).save();
	},
]);

const update = () => [
	body('username')
		.optional()
		.isString()
		.withMessage('Username must be a valid string.')
		.bail()
		.notEmpty()
		.withMessage('Username is empty.')
		.bail()
		.custom(Validation.unique(User, 'username')),
	body('password')
		.optional()
		.isString()
		.withMessage('Password must be a valid string.')
		.bail()
		.notEmpty()
		.withMessage('Password is empty.'),
	Validation.validate(),
	async (req: Request, res: Response) => {
		const data = req.body;

		const user = await User.findOne(req.params.id);

		if (!user) {
			throw new NotFoundException('User does not exist.');
		}

		if (data.password) {
			data.password = Hash.make(data.password);
		}

		return res.json(await user.fill(data).save());
	},
];

router.put('/:id', update());
router.patch('/:id', update());

router.delete('/:id', async (req, res) => {
	const user = await User.findOne(req.params.id);

	if (!user) {
		throw new NotFoundException('User does not exist.');
	}

	await user.remove();

	return res.status(204).end();
});

export const users = router;
