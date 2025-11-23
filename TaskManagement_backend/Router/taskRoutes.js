const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");
const taskController = require("../Controller/taskController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/data/registerUser", authController.registerUser);
router.post("/data/loginUser", authController.loginUser);

router.use(authMiddleware.protectedRoute);

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
