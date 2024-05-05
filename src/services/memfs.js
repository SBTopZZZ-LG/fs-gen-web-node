const { Volume } = require("memfs");

class MemfsServices {
	static createVolumeFromFiles(files) {
		const volume = Volume.fromJSON(files);
		return volume;
	}
}

module.exports = MemfsServices;
