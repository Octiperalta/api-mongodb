const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor() {}

  async findAll() {
    return await User.find();
  }

  async findAllWithPagination(filter, options) {
    return await User.paginate(filter, options);
  }

  async findById(id) {
    return await User.findById(id);
  }

  async save(user) {
    //* Se encripta la contraseña mediante bcrypt
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = UserRepository;
