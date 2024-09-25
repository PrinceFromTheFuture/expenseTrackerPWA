import { Request, Response } from "express";
import { db } from "../../../server.js";
import { transactionsTable } from "../../../schema.js";

const getAllTransactions = async(req: Request, res: Response) => { {
    const allTransactions = await db.select().from(transactionsTable);
    res.json(allTransactions);
  }};

export default getAllTransactions;
