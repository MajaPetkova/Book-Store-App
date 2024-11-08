import { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const deleteBook = () => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
      })
      .catch((err) => {
        setLoading(false);
        // alert("An error happened. Please check console");
        enqueueSnackbar("Error", {variant: "error"})
        console.log(err);
      });
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-3xl">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-700 rounded-xl w-[600px] p-8 mx-auto my-8">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button className="p-4 bg-red-500 text-white m-8 w-full" onClick={deleteBook}>Yes</button>
      </div>
    </div>
  );
};

export default DeleteBook;
