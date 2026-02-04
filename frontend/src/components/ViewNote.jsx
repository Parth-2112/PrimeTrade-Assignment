import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineTitle } from "react-icons/md";
import Loader from "./Loader";
import toast from "react-hot-toast";

const ViewNote = ({ id, onClose }) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/notes/${id}`, { withCredentials: true })
      .then((res) => {
        setNote(res.data.note);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to load note");
        // onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 w-[90%] md:w-[70%] lg:w-[50%] max-w-xl p-6 rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="relative w-full">
              <MdOutlineTitle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <p className="w-full p-4 pl-12 rounded-md bg-gray-100 dark:bg-zinc-800 wrap-break-word">
                {note?.title || "No Title"}
              </p>
            </div>

            <div className="relative w-full">
              <TbFileDescription className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <p className="w-full p-4 pl-12 rounded-md bg-gray-100 dark:bg-zinc-800 wrap-break-word">
                {note?.description || "No Description"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="btn-primary w-1/3 mx-auto mt-4"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewNote;
