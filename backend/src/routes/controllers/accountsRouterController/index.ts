import deleteAccountById from "./deleteAccountById.js";
import getAllAccounts from "./getAllAccounts.js";
import getUserSpendingsByTimeFrame from "./getUserSpendingsByTimeFrame.js";
import getUserSpendingsByUserPreferedTimeFrame from "./getUserSpendingsByUserPreferedTimeFrame.js";
import postNewAccount from "./postNewAccount.js";
import updateAccountById from "./updateAccountById.js";

export default {
  getAllAccounts,
  updateAccountById,
  deleteAccountById,
  postNewAccount,
  getUserSpendingsByTimeFrame,
  getUserSpendingsByUserPreferedTimeFrame,
};
