import { Bugdet } from "@/types/types";
import axios from "axios";
import { apiURL } from ".";

const HTTPPostNewBudget = async (body: { name: string; color: string; iconURL: string }) => {
  const res = await axios.post<{ success: boolean; message?: string; budget?: Bugdet }>(`${apiURL}/budgets`, body);

  return res.data;
};

export default HTTPPostNewBudget