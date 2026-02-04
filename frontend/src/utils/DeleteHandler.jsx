import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const deleteHandler = async ({ id, setRefresh }) => {
  try {
    const { data } = await axios.delete(
      `${server}/notes/${id}`,
      { withCredentials: true }
    );

    toast.success(data.message || "Deleted Successfully");
    setRefresh(prev => !prev);

  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

export default deleteHandler;
