// src/routes/users.ts

import * as express from "express";
import { db } from "../server.js";
import { transactionsTable } from "../schema.js";
import { between } from "drizzle-orm";
import dayjs from "dayjs";

const usersRouter = express.Router();

/**
 * @swagger
 * /timeFrameSpendings:
 *   get:
 *     summary: Retrieve total spendings within a specified time frame
 *     description: This endpoint returns the total amount spent within a specified date range.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-01T00:00:00Z"
 *                 description: Start date of the time frame.
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-30T23:59:59Z"
 *                 description: End date of the time frame.
 *     responses:
 *       200:
 *         description: A successful response containing total spendings in agorot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amountInAgorot:
 *                   type: integer
 *                   example: 1500
 *                   description: Total amount spent in agorot.
 *       400:
 *         description: Bad request if the date range is invalid.
 *       500:
 *         description: Internal server error.
 */
usersRouter.get("/timeFrameSpendings", async (req, res) => {
  const requestedTimeFrame: { from: string; to: string } = req.body;
  const transactionOccueredInTimeFrame = await db
    .select()
    .from(transactionsTable)
    .where(
      between(
        transactionsTable.date,
        dayjs(requestedTimeFrame.from).toDate(),
        dayjs(requestedTimeFrame.to).toDate()
      )
    );

  const spendingsInTimeFrame = transactionOccueredInTimeFrame.reduce((accumulator, transaction) => {
    return accumulator + transaction.amountInAgorot;
  }, 0);

  res.json({ amountInAgorot: spendingsInTimeFrame });
});

export default usersRouter;
