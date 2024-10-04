import { Transaction } from "@/types";
import { apiURL } from ".";
import axios from "axios";

const HTTPPostAccount = async (filledForm: { name: string; balanceInAgorot: number; iconURL: string }) => {
  const res = await axios.post<{ success: boolean; message?: string }>(`${apiURL}/accounts`, filledForm);
  return res.data;
};

export default HTTPPostAccount;
