const express = require("express");
const activityController = require("../controller/activity");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to ToDo REST API version 1.0.0",
  });
});

router.get("/activity", activityController.list);
router.post("/activity", activityController.create);
router.delete("/activity/:id", activityController.delete);

module.exports = router;
