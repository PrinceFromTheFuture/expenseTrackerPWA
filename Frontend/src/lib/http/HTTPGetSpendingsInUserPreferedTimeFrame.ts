import axios from "axios";
import { apiURL } from ".";

const HTTPGetSpendingsInUserPreferedTimeFrame = async () => {
  const res = await axios.get<{
    success: boolean;
    data: {
      accountId: string;
      amountInAgorotUsedInTimeFrame: number;
    }[];
  }>(`${apiURL}/accounts/userPreferedTimeFrameSpendings`);
  return res.data;
};

export default HTTPGetSpendingsInUserPreferedTimeFrame;
