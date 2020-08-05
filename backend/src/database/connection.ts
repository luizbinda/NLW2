import knex from "knex";

const db = knex({
  client: "pg",
  connection: "postgres://postgres:docker@127.0.0.1:5432/NLW2",
  searchPath: ["knex", "public"],
});

export default db;
