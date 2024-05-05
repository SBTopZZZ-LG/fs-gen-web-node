const { createApiResponse } = require("../models/api_response");
const Archive = require("../schemas/archive");
const MemfsServices = require("../services/memfs");
const ArchiverServices = require("../services/archiver");
const archiver = require("archiver");

/**
 * @param {Array<{ type: "create", payload: { path: string, content: string } }>} files
 * @returns {{[path: string]: string}} Memfs Parsable Files
 */
function getMemfsParsableFromFiles(files) {
	/**
	 * @param {{[path: string]: string}} acc
	 * @param {{ type: "create", payload: { path: string, content: string } }} file
	 * @returns {{[path: string]: string}}
	 */
	function filesReducer(acc, file) {
		acc[file.payload.path] = file.payload.content;
		return acc;
	}

	const memfsParsable = files.reduce(filesReducer, {});
	return memfsParsable;
}

/**
 * @param {archiver.Archiver} archive
 * @returns {Promise<Buffer>}
 */
function createBufferFromArchiverArchive(archive) {
	return new Promise((resolve, reject) => {
		const chunks = [];

		archive.on("data", (chunk) => {
			chunks.push(chunk);
		});

		archive.on("end", () => {
			const buffer = Buffer.concat(chunks);
			resolve(buffer);
		});

		archive.on("error", reject);

		archive.finalize();
	});
}

class FsControllers {
	static async fsCreate(req, res) {
		try {
			const { files } = req.body;

			const memfsParsableFiles = getMemfsParsableFromFiles(files);

			const memfsVolume =
				MemfsServices.createVolumeFromFiles(memfsParsableFiles);

			const zipArchive = ArchiverServices.createNewZipArchive();
			const filePaths = Object.keys(memfsParsableFiles);
			ArchiverServices.prepareZipArchiveUsingMemfsVolume(
				zipArchive,
				memfsVolume,
				filePaths
			);

			const buffer = await createBufferFromArchiverArchive(zipArchive);
			const archive = await Archive.create({
				data: buffer,
			});
			const archiveId = archive._id;

			res.status(200).send(
				createApiResponse({
					success: true,
					data: {
						archiveId,
					},
				})
			);
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
