const fs = require("fs");
const path = require("path");
const { createApiResponse } = require("../models/api_response");

class PrivacyControllers {
	static async privacyGet(req, res) {
		try {
			const privacyPolicy = fs
				.readFileSync(path.join(__dirname, "../pages", "privacy_policy.html"))
				.toString();

			res.set("Content-Type", "text/html");
			res.status(200).send(privacyPolicy);
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

module.exports = PrivacyControllers;
