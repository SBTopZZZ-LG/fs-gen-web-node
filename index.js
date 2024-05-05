// Cache environment variables
require("dotenv").config();

// Start Express server
require("./src/scripts/setup_express");

// Connect to MongoDB
require("./src/scripts/mongoose_connect");
