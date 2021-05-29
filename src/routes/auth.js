const { Router } = require("express");
const { login } = require("../controllers/auth");
const { postLoginRequestValitdations } = require("../middlewares/auth");
const router = Router();

//* 1) ROUTE, 2) VALIDATOR, 3) CONTROLLER
router.post("/login", postLoginRequestValitdations, login);

module.exports = router;
