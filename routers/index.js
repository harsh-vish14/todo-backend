const express = require("express");
const router = express.Router();
const todoRouters = require("./operations/index");

router.use("/", todoRouters);
module.exports = router;
