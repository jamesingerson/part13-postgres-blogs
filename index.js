const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readingLists");
const logoutRouter = require("./controllers/logout");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/logout", logoutRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "SequelizeDatabaseError") {
    return response
      .status(400)
      .send({ error: "Invalid values provided for fields." });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

// must be last
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
