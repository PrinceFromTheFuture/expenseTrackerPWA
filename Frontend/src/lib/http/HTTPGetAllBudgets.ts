import axios from "axios";
import { apiURL } from ".";
import { Bugdet } from "@/types";

const HTTPGetAllBudgets = async () => {
  const res = await axios.get<Bugdet[]>(`${apiURL}/budgets`);
  return res.data;
};
export default HTTPGetAllBudgets;
