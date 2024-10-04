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

export const apiURL = import.meta.env.VITE_API_BASE_URI as string | undefined;

if (!apiURL) {
  console.log("api is not defined!!");
}

axios.defaults.withCredentials = true;

export default {
  HTTPGetAllTransactions,
  HTTPGetAllBudgets,
  HTTPGetAllPaymentMethods,
  HTTPDeleteTransaction,
  HTTPGetAllAccounts,
  HTTPGetSpendingsInTimeFrame,
  HTTPGetUserBalance,
  HTTPPostNewBudget,
  HTTPPostNewUser,
  
  HTTPPostSignOutUser,
  HTTPSignInUser,
  HTTPVerifyToken,
  HTTPPostSignUpUser,
  HTTPPPutNewTransaction,
  HTTPPostNewTransaction,
};