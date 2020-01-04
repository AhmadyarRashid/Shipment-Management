const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/home", require("./home.routes"));

module.exports = router;
