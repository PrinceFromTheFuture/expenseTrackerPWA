import { Transaction } from "@/types/types";
import axios from "axios";
import { apiURL } from ".";

const HTTPPPutNewTransaction = async (filledForm: Transaction) => {
  const { id, ...rest } = filledForm;
  const data = { ...rest };
  const res = await axios.put<{ success: boolean }>(`${apiURL}/transactions/${id}`, data);
  return res.data;
};

export default HTTPPPutNewTransaction;
