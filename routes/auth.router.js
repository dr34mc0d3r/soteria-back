const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authorize = require("../middlewares/auth");

router.get("/", authorize, userController.listall);
router.get("/profile/:id", authorize, userController.profile);
router.get("/many", authorize, userController.loadSampleUsers);
router.post("/register", userController.register);
router.post("/signin", userController.signin);
router.put("/update/:id", authorize, userController.update);
router.delete("/delete/:id", authorize, userController.delete);

module.exports = router;
