const express = require("express");
const { body } = require("express-validator");

const {
	validationErrorHandler,
} = require("../middlewares/validation_error_handler");

const FsControllers = require("../controllers/fs");

const router = express.Router();

/**
 * {
 *  files: [{
 *    type: "create",
 *    payload: {
 *      path: string,
 *      content: string
 *    }
 *  }]
 * }
 */
const createRouteValidationChain = [
	body("files")
		.exists()
		.withMessage({
			code: "filesParamRequired",
			message: "Missing files parameter",
		})
		.isArray({ min: 1 })
		.withMessage({
			code: "invalidFilesParam",
			message: "Files parameter must be an Array with at least one file",
		}),
	body("files.*").isObject().withMessage({
		code: "invalidFilesParamItem",
		message: "File in the files parameter must be a valid JSON",
	}),
	body("files.*.type")
		.exists()
		.withMessage({
			code: "fileTypeParamRequired",
			message: "Missing file type parameter",
		})
		.isIn(["create"])
		.withMessage({
			code: "invalidFileTypeParam",
			message:
				'File type parameter must be either of the possible values - "create"',
		}),
	body("files.*.payload")
		.exists()
		.withMessage({
			code: "filePayloadParamRequired",
			message: "Missing file payload parameter",
		})
		.isObject()
		.withMessage({
			code: "invalidFilePayloadParam",
			message: "File payload parameter must be a valid JSON",
		}),
	body("files.*.payload.path")
		.exists()
		.withMessage({
			code: "payloadPathParamRequired",
			message: "Missing payload path parameter",
		})
		.notEmpty()
		.withMessage({
			code: "invalidPayloadPathParam",
			message: "Payload path must be a non-empty string",
		}),
	body("files.*.payload.content")
		.exists()
		.withMessage({
			code: "payloadContentParamRequired",
			message: "Missing payload content parameter",
		})
		.isString()
		.withMessage({
			code: "invalidPayloadContentParam",
			message: "Payload content must be a string",
		}),
];
router.post(
	"/",
	createRouteValidationChain,
	validationErrorHandler,
	FsControllers.fsCreate
);

module.exports = router;
