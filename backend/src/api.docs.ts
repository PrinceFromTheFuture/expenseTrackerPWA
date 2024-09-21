import { Bugdet, PaymentMethod, Transaction, TransactionForm } from "./types.js";

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
  },
};
