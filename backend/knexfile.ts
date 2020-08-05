import path from "path";

module.exports = {
  client: "pg",
  connection: "postgres://postgres:docker@127.0.0.1:5432/NLW2",
  migrations: {
    extension: "ts",
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
};
