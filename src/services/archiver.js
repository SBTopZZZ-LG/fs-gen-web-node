const archiver = require("archiver");
const { Volume } = require("memfs/lib/volume");

class ArchiverServices {
	/**
	 * @param {number} compressionLevel
	 * @returns {archiver.Archiver}
	 */
	static createNewZipArchive(compressionLevel) {
		const archive = archiver("zip", { zlib: { level: compressionLevel } });
		return archive;
	}

	/**
	 * @param {archiver.Archiver} zipArchive
	 * @param {Volume} memfsVolume
	 * @param {Array<string>} filePaths
	 */
	static prepareZipArchiveUsingMemfsVolume(zipArchive, memfsVolume, filePaths) {
		for (const filePath of filePaths) {
			const fileReadStream = memfsVolume.createReadStream(filePath);
			zipArchive.append(fileReadStream, { name: filePath });
		}
	}
}

module.exports = ArchiverServices;
