const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const chalk = require("chalk");
const userController = require("../controller/user");
async function routes(fastify, options) {
  fastify.get("/api/users", userController.getUsers);
  fastify.post("/api/users", userController.createUser);
  fastify.put("/api/users/:id", userController.editUser);
  fastify.delete("/api/users/:id", userController.deleteUser);
}

module.exports = routes;
