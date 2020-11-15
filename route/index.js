const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to ToDo REST API version 1.0.0",
  });
});

module.exports = router;
