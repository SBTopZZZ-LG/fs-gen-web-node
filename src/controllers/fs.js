const { createApiResponse } = require("../models/api_response");

class FsControllers {
	static async fsCreate(req, res) {
		try {
			res.status(200).send(createApiResponse({ success: true }));
		} catch (error) {
			const errorMessage = error?.message ?? "Unknown error occurred";
			res.status(500).send(
				createApiResponse({
					success: false,
					status: {
						code: "serverError",
						message: errorMessage,
					},
				})
			);
		}
	}
}

module.exports = FsControllers;
