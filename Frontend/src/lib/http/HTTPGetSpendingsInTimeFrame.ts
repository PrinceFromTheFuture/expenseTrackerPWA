import axios from "axios";
import { apiURL } from ".";

const HTTPGetSpendingsInTimeFrame = async (timeFrame: { from: string; to: string }) => {
    const res = await axios.post<{
      amountInAgorot: number;
    }>(`${apiURL}/users/timeFrameSpendings`, timeFrame);
    return res.data;
  };

  export default HTTPGetSpendingsInTimeFrame