import { Account } from "@/types";
import axios from "axios";
import { apiURL } from ".";

const HTTPGetAllAccounts = async () => {
  const res = await axios.get<Account[]>(`${apiURL}/accounts`);
  return res.data;
};

export default HTTPGetAllAccounts;
