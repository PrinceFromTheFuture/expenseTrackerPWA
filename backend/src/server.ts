import express from "express";
import budgetsRouter from "./routes/budgetsRouter.js";
import paymentsMethodRouter from "./routes/paymentMethodRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";
import { configDotenv } from "dotenv";

import { neon } from "@neondatabase/serverless" ;
import { drizzle } from "drizzle-orm/neon-http";

configDotenv();
const server = express();
const port = process.env.PORT || 3000;
if (!process.env.DB_CONNECTION_STRING) {
  console.log(
    "the data base connection string is not readable or not configured properly"
  );
  process.abort();
}

const sql = neon(process.env.DB_CONNECTION_STRING!);
export const db = drizzle(sql);

server.use("/budegts", budgetsRouter);
server.use("/paymentsMethods", paymentsMethodRouter);
server.use("/transactions", transactionsRouter);

server.use(express.json());

function initilizeServer() {
  try {
    server.listen(port, () => {
      console.log(
        `server is up and running on port: ${port}`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

initilizeServer();
server.get("/", () => {
  console.log("hellow world");
});
