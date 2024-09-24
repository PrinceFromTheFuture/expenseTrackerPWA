import express from "express";
import budgetsRouter from "./routes/budgetsRouter.js";
import paymentsMethodRouter from "./routes/paymentMethodRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";
import { configDotenv } from "dotenv";
import { exec } from "child_process";

import cors from "cors";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { transactionsTable } from "./schema.js";
import { between } from "drizzle-orm";
import dayjs from "dayjs";
import usersRouter from "./routes/usersRouter.js";

configDotenv();

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // Specify the extended op

const port = process.env.PORT || 3000;
if (!process.env.DB_CONNECTION_STRING) {
  console.log(
    "the data base connection string is not readable or not configured properly"
  );
  process.abort();
}

const sql = neon(process.env.DB_CONNECTION_STRING!);
export const db = drizzle(sql);

server.use("/budgets", budgetsRouter);
server.use("/paymentMethods", paymentsMethodRouter);
server.use("/transactions", transactionsRouter);
server.use("/users", usersRouter);

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
server.get("/", async (req, res) => {
  res.send("welcome to Expense Tracker PWA API");
  const data = await db
    .select()
    .from(transactionsTable)
    .where(
      between(
        transactionsTable.date,
        dayjs().subtract(2, "hours").toDate(),
        dayjs().toDate()
      )
    );
  console.log(data);
  console.log(dayjs().toISOString());
});

server.post("/gitWebHook", (req, res) => {
  console.log('fd')
  exec("cd ../ && git pull");
});
