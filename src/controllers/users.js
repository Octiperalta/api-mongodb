const express = require("express");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = (req, res) => {
  const users = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Joe",
    },
  ];

  res.json(users);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = (req, res) => {
  const user = req.body;

  res.status(201).json({ message: "User created", user });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;

  res.json({ message: "User updated" });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = (req, res) => {
  const { id } = req.params;

  res.json({ message: "User deleted", id });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
