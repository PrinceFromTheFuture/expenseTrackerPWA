import axios from "axios";
import { apiURL } from ".";
import { Bugdet } from "@/types/types";

const HTTPGetAccountsBalanceSumSelector = async () => {
  const res = await axios.get<{ accountsBalanceSumSelector: string[]; success: boolean }>(`${apiURL}/users/accountsBalanceSumSelector`);
  return res.data;
};
export default HTTPGetAccountsBalanceSumSelector;
