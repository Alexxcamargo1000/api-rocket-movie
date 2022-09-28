require("express-async-errors");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
const database = require("./database");
const uploadConfig = require("./configs/uploads")
const cors = require("cors")
const PORT = 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes);

database();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});
app.listen(PORT, () => {
  console.log(`Server listing on PORT ${PORT}`);
});
