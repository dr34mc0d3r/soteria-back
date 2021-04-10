const express = require('express');
const intakeontroller = require('../controllers/intake.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, intakeontroller.save);
router.get("/", intakeontroller.index);
router.get("/:id", intakeontroller.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, intakeontroller.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, intakeontroller.destroy);

module.exports = router;