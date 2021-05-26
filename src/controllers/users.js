const express = require("express");
const {
  findAll,
  findById,
  save,
  update,
  remove,
} = require("../services/userService");
const Success = require("../handlers/successHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll(req.query.filter, req.query.options);
    res.json(new Success(users));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await findById(req.params.id);
    res.json(new Success(user));
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
    user = await save(user);
    res.status(201).json(new Success(user));
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
    const userUpdated = await update(id, user);

    res.json(new Success(userUpdated));
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
    const user = await remove(id);

    res.json(new Success(user));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
