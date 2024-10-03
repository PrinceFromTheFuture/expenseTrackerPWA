import { Account, Bugdet, PaymentMethod, Transaction, TransactionForm } from "./types.js";

const serverDefnition = {
  name: "expensee tracker pwa API",
  routes: {
    budgets: {
      endpoints: [
        {
          path: "/",
          method: "GET",
          response: Array.prototype as Bugdet[],
        },
        {
          path: "/",
          method: "POST",
          request: Object.prototype as { name: string; color: string; iconURL: string },
          response: Object.prototype as { success: boolean; message?: string; budget: Bugdet },
        },
      ],
    },
    paymentMethods: {
      endpoints: [
        {
          path: "/",
          method: "GET",
          response: Array.prototype as PaymentMethod[],
        },
      ],
    },
    transactions: {
      endpoints: [
        {
          path: "/",
          method: "GET",
          response: Array.prototype as Transaction[],
        },
        {
          path: "/",
          method: "POST",
          request: Object.prototype as TransactionForm,
          response: Object.prototype as Transaction,
        },
        {
          path: "/:transactionId",
          method: "DELETE",
          response: Object.prototype as { success: boolean },
        },
        {
          path: "/:transactionId",
          method: "PUT",
          request: Object.prototype as TransactionForm,
          response: Object.prototype as { success: boolean },
        },
      ],
    },
    users: {
      endpoints: [
        {
          path: "/timeFrameSpendings",
          method: "POST",
          request: Object.prototype as { from: string; to: string },
          response: Object.prototype as { amountInAgorot: number },
        },
        {
          path: "/balance",
          method: "GET",
          response: Object.prototype as { balanceInAgorot: number },
        },
      ],
    },
    accounts: { endpoints: [{ path: "/", method: "GET", response: Object.prototype as Account[] }] },
    auth: {
      endpoints: [
        {
          path: "/signUp",
          method: "POST",
          request: Object.prototype as { email: string; password: string; name: string | null },
          response: Object.prototype as { success: boolean; userId?: string; message?: string },
          responseCookie: Object.prototype as {
            name: "token";
            httpOnly: true;
            secure: true;
            maxAge: number;
          },
        },
        {
          path: "/signIn",
          method: "POST",
          request: Object.prototype as { email: string; password: string },
          response: Object.prototype as { success: boolean; userId?: string; message?: string },
          responseCookie: Object.prototype as {
            name: "token";
            httpOnly: true;
            secure: true;
            maxAge: number;
          },
        },
        {
          path: "/verifyToken",
          method: "GET",
          requestCookie: String() || null,
          response: Object.prototype as { success: boolean; message?: string; userId?: string },
        },
        {
          path: "/signOut",
          method: "POST",
          response: Object.prototype as { success: boolean; message?: string },
          responseCookie: Object.prototype as {
            name: "token";
            value: undefined;
            httpOnly: true;
            secure: true;
            maxAge: number;
          },
        },
      ],
    },
  },
};

export default serverDefnition;
