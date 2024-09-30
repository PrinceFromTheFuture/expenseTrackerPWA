import express from "express";
import budgetsRouter from "./routes/endpoints/budgetsRouter.js";
import paymentsMethodRouter from "./routes/endpoints/paymentMethodRouter.js";
import transactionsRouter from "./routes/endpoints/transactionsRouter.js";
import { configDotenv } from "dotenv";
import { exec } from "child_process";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import { transactionsTable } from "./schema.js";
import { between } from "drizzle-orm";
import dayjs from "dayjs";
import usersRouter from "./routes/endpoints/usersRouter.js";
import authRouter from "./routes/endpoints/authRouter.js";
import cookieParser from "cookie-parser";
import { drizzle } from "drizzle-orm/neon-http";
configDotenv();
//ds
const server = express();
//server.use(cors({ origin: "http://localhost:5173" }));
//server.use(cors({ origin: process.env.FRONTENDURL }));
server.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // If cookies or credentials are used
}));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // Specify the extended op
const port = process.env.PORT || 3000;
const envoirmennt = process.env.environment;
if (!envoirmennt) {
    console.log("the envoirment mode is not readable or not configured properly");
    process.abort();
}
console.log(envoirmennt);
const DBConnectionString = envoirmennt === "PRODUCTION"
    ? process.env.PRODUCTION_DB_CONNECTION_STRING
    : process.env.DEVELOPMENT_DB_CONNECTION_STRING;
if (!DBConnectionString) {
    console.log("the data base connection string is not readable or not configured properly");
    process.abort();
}
const sql = neon(DBConnectionString);
export const db = drizzle(sql);
server.use("/api/budgets", budgetsRouter);
server.use("/api/paymentMethods", paymentsMethodRouter);
server.use("/api/transactions", transactionsRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
function initilizeServer() {
    try {
        server.listen(port, () => {
            console.log(`server is up and running on port: ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
}
initilizeServer();
server.get("/api", async (req, res) => {
    res.send("welcome to Expense Tracker PWA API");
    const data = await db
        .select()
        .from(transactionsTable)
        .where(between(transactionsTable.date, dayjs().subtract(2, "hours").toDate(), dayjs().toDate()));
    console.log(data);
    console.log(dayjs().toISOString());
});
server.post("/api/gitWebHook", (req, res) => {
    exec("cd ../ && git pull");
    exec("npm i");
    exec("cd ../ && cd Frontend && npm i");
    res.send("got it");
});
