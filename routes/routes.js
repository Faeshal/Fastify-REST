const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const chalk = require("chalk");
async function routes(fastify, options) {
  // * Get All User
  fastify.get(
    "/api/user",
    asyncHandler(async (request, reply) => {
      const user = await User.find();
      if (user.length == 0) {
        reply.code(404).send({ success: true, message: "Data is Empty" });
      }
      reply.code(200).send({ success: true, total: user.length, data: user });
    })
  );

  // * Add New User
  fastify.post(
    "/api/adduser",
    asyncHandler(async (request, reply) => {
      const username = request.body.username;
      const password = request.body.password;

      if (!username || !password) {
        return reply
          .code(400)
          .send({ success: false, message: "Data cannot be empty" });
      }

      const user = new User({
        username: username,
        password: password,
      });
      const result = await user.save();
      console.log(chalk.yellow(result));

      reply.code(200).send({ success: true, data: result });
    })
  );

  // * Edit User
  fastify.put(
    "/api/edituser/:id",
    asyncHandler(async (request, reply) => {
      const id = request.params.id;
      const user = await User.findById(id);
      if (!user) {
        return reply
          .code(404)
          .send({ success: false, message: "Data with this ID is not found" });
      }
      const result = await User.findByIdAndUpdate(id, request.body);
      reply.code(200).send({ success: true, data: result });
    })
  );

  // * Delete User
  fastify.delete(
    "/api/deleteuser/:id",
    asyncHandler(async (request, reply) => {
      const id = request.params.id;
      if (!id) {
        return reply.code(400).send({ success: false, message: "ID is empty" });
      }
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        return reply
          .code(400)
          .send({ success: false, message: "User with this ID is not found" });
      }
      reply
        .code(200)
        .send({ success: true, message: "Data Succesfully Delete" });
    })
  );
}

module.exports = routes;
