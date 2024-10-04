import axios from "axios";
import { apiURL } from ".";

const HTTPPostSignOutUser = async () => {
    const res = await axios.post<{ success: boolean; message?: string }>(`${apiURL}/auth/signOut`);
  
    return res.data;
  };

  export default HTTPPostSignOutUser