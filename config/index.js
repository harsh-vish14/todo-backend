const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://todo-user:todo-user@cluster0.rqyvj.mongodb.net/todo?retryWrites=true&w=majority",
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );

    console.log(
      chalk.blueBright.underline(
        `Database Connected (${conn.connection.name}): ${conn.connection.host}`
      )
    );
    return conn.connection.db;
  } catch (err) {
    console.log(chalk.bold.redBright(`Error: ${err.message}`));
    throw new Error("Database not Connected");
  }
};
