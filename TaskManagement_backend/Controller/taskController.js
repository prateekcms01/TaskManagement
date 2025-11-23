const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Title is required" });
  }

  const userId = req.user.id;
  try {
    const [result] = await db.execute(
      "INSERT INTO tasks(title,description,user_id) VALUES(?,?,?)",
      [title, description || null, userId]
    );
    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const [tasks] = await db.execute("SELECT * FROM tasks WHERE user_id=?", [
      userId,
    ]);
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const [task] = await db.execute(
      "SELECT * FROM tasks WHERE id=? AND user_id=?",
      [id, userId]
    );

    if (task.length === 0) {
      return res.status(404).json({ message: "Task not found for this user" });
    }
    return res.status(200).json({ task: task[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    const [task] = await db.execute(
      "SELECT * FROM tasks WHERE id=? AND user_id=?",
      [id, userId]
    );

    if (task.length === 0) {
      return res
        .status(403)
        .json({ message: "User does not belong to this task" });
    }

    const [result] = await db.execute(
      "UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?",
      [title, description, status, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const [result] = await db.execute(
      "DELETE FROM tasks WHERE id=? AND user_id=?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found for this user" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
