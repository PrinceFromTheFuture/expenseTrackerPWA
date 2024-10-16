import axios from "axios";
import { apiURL } from ".";
import { Bugdet } from "@/types/types";

const HTTPUpdateAccountsBalanceSumSelector = async (newArray: string[]) => {
  const res = await axios.put<{ success: boolean }>(`${apiURL}/users/accountsBalanceSumSelector`, newArray);
  return res.data;
};
export default HTTPUpdateAccountsBalanceSumSelector;
 