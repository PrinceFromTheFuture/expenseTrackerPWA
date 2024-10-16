import axios from "axios";
import { apiURL } from ".";

const HTTPGetSpendingsInTimeFrame = async (timeFrame: { from: string; to: string }) => {
  const res = await axios.post<{
    success: boolean;
    data: {
      accountId: string;
      amountInAgorotUsedInTimeFrame: number;
    }[];
  }>(`${apiURL}/accounts/timeFrameSpendings`, timeFrame);
  return res.data;
};

export default HTTPGetSpendingsInTimeFrame;
