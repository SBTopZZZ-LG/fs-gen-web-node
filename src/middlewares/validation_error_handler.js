const { validationResult } = require("express-validator");

const { createApiResponse } = require("../models/api_response");

const validationErrorHandler = (req, res, next) => {
	const validationErrorResult = validationResult(req);

	const hasErrors = !validationErrorResult.isEmpty();
	if (hasErrors) {
		const status = validationErrorResult.array()[0].msg;
		res.status(400).send(createApiResponse({ success: false, status }));

		return;
	}

	next();
};

module.exports = { validationErrorHandler };
