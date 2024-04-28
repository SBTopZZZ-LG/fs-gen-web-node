const express = require("express");
const cors = require("cors");

const fsRoute = require("../routes/fs");

const { PORT, ALLOWED_ORIGINS } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ALLOWED_ORIGINS.split(",").map((s) => s.trim());
app.use(cors({ origin: allowedOrigins }));

function appListenCallback() {
	console.log("[setup_express]", "Express server running on port", PORT);
}

app.use("/api/v1/fs", fsRoute);

app.listen(PORT, appListenCallback);
