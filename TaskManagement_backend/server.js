const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const taskRoutes = require("./Router/taskRoutes");

app.use(express.json());
app.use("/api", taskRoutes);

app.get("/health", (req, res) => {
  res.send("Welcome to the Task Management Backend!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
