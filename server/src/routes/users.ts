import { Router } from 'express';
import { authenticate } from '../middlewares';
import { User } from '../models/User';

const router = Router();

router.use(...authenticate());

router.get('/', async (_, res) => {
	return res.json(await User.find());
});

export const users = router;
