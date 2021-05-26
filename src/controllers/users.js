const express = require("express");
const User = require("../models/user");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    user = await User.create(user);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    user._id = id;

    await User.updateOne(user);

    res.json({ message: "User updated" }, user);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    await user.remove();
    res.json({ message: "User deleted", id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
