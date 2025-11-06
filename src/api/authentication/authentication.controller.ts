import express from 'express'

const TEST_TOKEN = process.env.TEST_TOKEN

class AuthenticationController {
	constructor() {}

	login = async (_req: express.Request, res: express.Response) => {
		res.status(200).json({token: TEST_TOKEN});
	}
}

export default new AuthenticationController()