const express = require("express");
const router = express.Router();

// register all routers
router.use("/user", require("./user.routes"));
router.use("/shipment", require("./shipment.routes"));

module.exports = router;
