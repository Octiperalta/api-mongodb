const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/users");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
