import axios from "axios";
import { useState } from "react";
import { server } from "../main";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineTitle } from "react-icons/md";
import toast from "react-hot-toast";

const NewNote = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${server}/notes/new`,
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);

      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="flex flex-col gap-6 w-[90%] md:w-[70%] lg:w-[50%] max-w-xl p-6 rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md"
      >
        <div className="relative w-full">
          <MdOutlineTitle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div className="relative w-full">
          <TbFileDescription className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={description}
            placeholder="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`btn-primary w-1/2 mx-auto mt-4 ${loading? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default NewNote;
