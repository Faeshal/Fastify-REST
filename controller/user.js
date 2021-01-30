const asyncHandler = require("express-async-handler");
const User = require("../model/User");

// * @route   GET api/users
// @desc      Get all users
// @access    Private
exports.getUsers = asyncHandler(async (request, reply) => {
  const user = await User.find().sort({ _id: -1 });
  if (user.length == 0) {
    reply.code(404).send({ success: true, message: "Data is Empty" });
  }
  reply.code(200).send({ success: true, total: user.length, data: user });
});

// * @route   POST api/users
// @desc      Create new users
// @access    Private
exports.createUser = asyncHandler(async (request, reply) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return reply
      .code(400)
      .send({ success: false, message: "Data cannot be empty" });
  }

  const user = new User({
    username,
    password,
  });

  const result = await user.save();
  reply.code(200).send({ success: true, data: result });
});

// * @route   PUT api/users/:id
// @desc      Edit users
// @access    Private
exports.editUser = asyncHandler(async (request, reply) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (!user) {
    return reply
      .code(404)
      .send({ success: false, message: "Data with this ID is not found" });
  }
  const result = await User.findByIdAndUpdate(id, request.body);
  reply.code(200).send({ success: true, data: result });
});

// * @route   DELETE api/users/:id
// @desc      DELETE  users
// @access    Private
exports.deleteUser = asyncHandler(async (request, reply) => {
  const { id } = request.params;
  if (!id) {
    return reply.code(400).send({ success: false, message: "ID is empty" });
  }
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    return reply
      .code(400)
      .send({ success: false, message: "User with this ID is not found" });
  }
  reply.code(200).send({ success: true, message: "Data Succesfully Delete" });
});
