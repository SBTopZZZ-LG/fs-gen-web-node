/**
 * @param {{ success: boolean, status: { code: string, message: string } | undefined, data: object | null }} Options
 * @returns {{ success: boolean, status: { code: string, message: string }, data: object | null }}
 */
function createApiResponse({ success, status = undefined, data = null }) {
	if (status === undefined) {
		if (success) {
			status = {
				code: "ok",
				message: "OK",
			};
		} else {
			status = {
				code: "unknownError",
				message: "Unknown error occurred",
			};
		}
	}

	const apiResponse = {
		success,
		status,
		data,
	};

	return apiResponse;
}

module.exports = { createApiResponse };
