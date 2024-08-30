import express from 'express';
import { randomId } from '../constants';
import Short from '../models/Short';
import type { IShort } from '../types';

const shortRouter = express.Router();

shortRouter.get('/:shotId', async (req, res, next) => {
	try {
		const id = req.params.shotId;
		const short = await Short.findOne({ shortUrl: id });
		
		if (short === null) {
			return res.status(404).send({
				error: 'Short not found'
			});
		}
		
		return res.status(301).redirect(short.originalUrl);
	} catch (err) {
		next(err);
	}
});

shortRouter.post('/', async (req, res, next) => {
	try {
		
		if (!req.body.originalUrl || req.body.originalUrl.length === 0) {
			return res.status(400).send({
				error: 'An URL was not specified'
			});
		}
		
		const shortValues: IShort = {
			originalUrl: req.body.originalUrl,
			shortUrl: randomId()
		};
		
		const short = new Short(shortValues);
		await short.save();
		
		return res.send(short);
	} catch (err) {
		next(err);
	}
});

export default shortRouter;