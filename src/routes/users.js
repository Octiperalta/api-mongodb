const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/users");
const {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getByIdRequestValidations,
  getAllRequestValidations,
} = require("../middlewares/users");

const router = Router();

//* 1) ROUTE, 2) VALIDATOR, 3) CONTROLLER
router.get("/", getAllRequestValidations, getAllUsers);
router.get("/:id", getByIdRequestValidations, getUserById);
router.post("/", postRequestValidations, createUser);
router.put("/:id", putRequestValidations, updateUser);
router.delete("/:id", deleteRequestValidations, deleteUser);
// router.patch("/:id", updateUser);

module.exports = router;
