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
                {
                    path: "/",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
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
                {
                    path: "/",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                },
                {
                    path: "/:paymentMethodId",
                    method: "PUT",
                    request: Object.prototype,
                    response: Object.prototype,
                },
                {
                    path: "/:paymentMethodId",
                    method: "DELETE",
                    response: Object.prototype,
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
            endpoints: [],
        },
        accounts: {
            endpoints: [
                { path: "/", method: "GET", response: Object.prototype },
                {
                    path: "/",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                },
                { path: "/:accountId", method: "PUT", response: Object.prototype },
                { path: "/:accountId", method: "DELETE", response: Object.prototype },
                {
                    path: "/timeFrameSpendings",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                },
            ],
        },
        auth: {
            endpoints: [
                {
                    path: "/signUp",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                    responseCookie: Object.prototype,
                },
                {
                    path: "/signIn",
                    method: "POST",
                    request: Object.prototype,
                    response: Object.prototype,
                    responseCookie: Object.prototype,
                },
                {
                    path: "/verifyToken",
                    method: "GET",
                    requestCookie: String() || null,
                    response: Object.prototype,
                },
                {
                    path: "/signOut",
                    method: "POST",
                    response: Object.prototype,
                    responseCookie: Object.prototype,
                },
            ],
        },
    },
};
export default serverDefnition;
