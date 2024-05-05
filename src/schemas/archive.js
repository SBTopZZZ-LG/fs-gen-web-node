const mongoose = require("mongoose");

const DOCUMENT_VALIDITY_IN_SECONDS = 600;

const schema = new mongoose.Schema(
	{
		data: {
			type: Buffer,
			required: true,
		},
		expiresAfter: {
			type: Date,
			default: () => Date.now() + DOCUMENT_VALIDITY_IN_SECONDS * 1000,
			expires: DOCUMENT_VALIDITY_IN_SECONDS,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, ret) => {
				delete ret.__v;
			},
		},
	}
);

const modelledSchema = mongoose.model("archive", schema);
module.exports = modelledSchema;
