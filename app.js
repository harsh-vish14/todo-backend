const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/index");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const routes = require("./routers");
const chalk = require("chalk");
const errorHandler = require("./helper/errorHandler");

const app = express();

app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "TODO server",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://bpc-backend.herokuapp.com/",
        description: "Deployed server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(
    chalk.yellowBright.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});

// Handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(chalk.bold.redBright(`Error: ${err.message}`));

  console.log(err);

  server.close(() => {
    console.log(
      chalk.bold.redBright("Server closed due to unhandled promise rejection")
    );
    process.exit(1);
  });
});
