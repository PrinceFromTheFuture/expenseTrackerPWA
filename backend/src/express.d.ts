// express.d.ts
import { Request } from "express"; // Import the Request interface

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Extend the Request interface to include userId
    }
  }
}
