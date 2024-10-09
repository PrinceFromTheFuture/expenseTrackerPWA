import { Transaction } from "@/types/types";
import { apiURL } from ".";
import axios from "axios";

const HTTPPostNewTransaction = async (filledForm: Omit<Transaction, "id">) => {
  const res = await axios.post<Transaction>(`${apiURL}/transactions`, filledForm);
  return res.data;
};

export default HTTPPostNewTransaction;
