import axios from "axios";
import HTTPGetAllTransactions from "./HTTPGetAllTransactions";
import HTTPGetAllBudgets from "./HTTPGetAllBudgets";
import HTTPGetAllPaymentMethods from "./HTTPGetAllPaymentMethods";
import HTTPDeleteTransaction from "./HTTPDeleteTransaction";
import HTTPGetAllAccounts from "./HTTPGetAllAccounts";
import HTTPGetSpendingsInTimeFrame from "./HTTPGetSpendingsInTimeFrame";
import HTTPGetUserBalance from "./HTTPGetUserBalance";
import HTTPPostNewBudget from "./HTTPPostNewBudget";
import HTTPPostNewUser from "./HTTPPostNewUser";
import HTTPPostSignOutUser from "./HTTPPostSignOutUser";
import HTTPVerifyToken from "./HTTPVerifyToken";
import HTTPPPutNewTransaction from "./HTTPPPutNewTransaction";
import HTTPPostSignUpUser from "./HTTPPostSignUpUser";
import HTTPPostNewTransaction from "./HTTPPostNewTransaction";
import HTTPSignInUser from "./HTTPSignInUser";
import HTTPDeleteAccount from "./HTTPDeleteAccount";
import HTTPPutAccountById from "./HTTPPutAccountById";
import HTTPPostAccount from "./HTTPPostAccount";
import HTTPPostPaymentMethod from "./HTTPPostPaymentMethod";
import HTTPPutPaymentMethod from "./HTTPPutPaymentMethod";
import HTTPDeletePaymentMethod from "./HTTPDeletePaymentMethod";

export const apiURL = import.meta.env.VITE_API_BASE_URI as string | undefined;

if (!apiURL) {
  console.log("api is not defined!!");
}

axios.defaults.withCredentials = true;

export default {
  HTTPGetAllTransactions,
  HTTPDeletePaymentMethod,
  HTTPGetAllBudgets,
  HTTPGetAllPaymentMethods,
  HTTPDeleteTransaction,
  HTTPGetAllAccounts,
  HTTPGetSpendingsInTimeFrame,
  HTTPGetUserBalance,
  HTTPPostPaymentMethod,
  HTTPPostNewBudget,
  HTTPPostNewUser,
  HTTPPutPaymentMethod,
  HTTPDeleteAccount,
  HTTPPutAccountById,
  HTTPPostAccount,
  HTTPPostSignOutUser,
  HTTPSignInUser,
  HTTPVerifyToken,
  HTTPPostSignUpUser,
  HTTPPPutNewTransaction,
  HTTPPostNewTransaction,
};
