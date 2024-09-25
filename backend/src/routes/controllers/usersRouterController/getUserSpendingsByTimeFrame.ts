import { Request, Response } from "express";
import { transactionsTable } from "../../../schema.js";
import { between } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "../../../server.js";

const getUserSpendingsByTimeFrame =async (req:Request, res:Response) => {
    const requestedTimeFrame: {
      from: string;
      to: string;
    } = req.body;
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
  }
export default getUserSpendingsByTimeFrame;
