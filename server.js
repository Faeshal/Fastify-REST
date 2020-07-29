const fastify = require("fastify")();
const asyncHandler = require("express-async-handler");
const chalk = require("chalk");
const PORT = 5000;
const mongoose = require("mongoose");
const CONNECTION_URI = "mongodb://localhost:27017/user-fastify";

// * Routing
fastify.register(require("./routes/routes"));

// * Connection Databse
mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(chalk.blueBright("MongoDB connected"));
});

// * Server Listen
const start = asyncHandler(async (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  await fastify.listen(PORT);
  console.log(chalk.green.inverse(`Server Is Running on ${PORT}`));
});
start();
