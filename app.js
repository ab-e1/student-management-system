const express = require("express");
const studentRoutes = require("./routes/studentRoute.js");
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/students", studentRoutes);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
