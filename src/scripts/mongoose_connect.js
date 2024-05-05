const mongoose = require("mongoose");

const { MONGOOSE_CONN_STR } = process.env;

function mongooseConnectionHandler() {
	console.log("[mongoose_connect]", "Connected");
}

function mongooseDisconnectionHandler() {
	console.log("[mongoose_connect]", "Disconnected");
}

function mongooseErrorHandler(error) {
	console.error("[mongoose_connect]", error);
}

mongoose.connection.on("connected", mongooseConnectionHandler);
mongoose.connection.on("disconnected", mongooseDisconnectionHandler);
mongoose.connection.on("error", mongooseErrorHandler);

mongoose.connect(MONGOOSE_CONN_STR);
