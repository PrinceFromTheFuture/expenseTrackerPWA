import { Transaction } from "@/types/types";
import axios from "axios";
import { apiURL } from ".";

const HTTPGetAllTransactions = async () => {
  const res = await axios.get<Transaction[]>(`${apiURL}/transactions`);

  return res.data;
};
export default HTTPGetAllTransactions;
