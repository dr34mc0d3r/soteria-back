const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");

const testController = require("../controllers/test.controller");

router.post("/add", authorize, testController.testInsert);
router.get("/list", authorize, testController.testList);
router.get("/find", authorize, testController.testFind);
router.get("/findnested", authorize, testController.testFindNested);
router.get("/many", authorize, testController.testInsertMany);
router.get("/many5x", authorize, testController.testInsertMany5x);
router.get("/count", authorize, testController.testCount);

module.exports = router;
