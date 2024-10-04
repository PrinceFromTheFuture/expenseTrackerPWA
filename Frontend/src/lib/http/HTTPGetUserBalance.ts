import axios from "axios";
import { apiURL } from ".";

const HTTPGetUserBalance = async () => {
    const res = await axios.get<{
      balanceInAgorot: number;
    }>(`${apiURL}/users/balance`);
    return res.data;
  };

  export default HTTPGetUserBalance