const serverDefnition = {
    name: "expensee tracker pwa API",
    routes: {
        budgets: {
            endpoints: [
                {
                    path: "/",
                    method: "GET",
                    response: Array.prototype,
                },
            ],
        },
        paymentMethods: {
            endpoints: [
                {
                    path: "/",
                    method: "GET",
                    response: Array.prototype,
                },
            ],
        },
        transactions: {
            endpoints: [
                {
                    path: "/",
                    method: "GET",
                    response: Array.prototype,
                },
                {
                    path: "/",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                },
                {
                    path: "/:transactionId",
                    method: "DELETE",
                    response: Object.prototype,
                },
                {
                    path: "/:transactionId",
                    method: "PUT",
                    request: Object.prototype,
                    response: Object.prototype,
                },
            ],
        },
        users: {
            endpoints: [
                {
                    path: "/timeFrameSpendings",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                },
                {
                    path: "/balance",
                    method: "GET",
                    response: Object.prototype,
                },
            ],
        },
    },
};
export {};
