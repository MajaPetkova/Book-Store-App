import { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);

    axios
      .post(`https://book-store-app-backend-xoq0.onrender.com/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        // console.log(res);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // alert("An error happened. Check the console");
        enqueueSnackbar("Error", {variant: "error"})
      });
  };
  return (
    <div>
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[700px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Title</label>
            <input
              type="text"
              className="border-2 border-gray-400 px-4 pz-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Author</label>
            <input
              type="text"
              className="border-2 border-gray-400 px-4 pz-2 w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Publish Year</label>
            <input
              type="text"
              className="border-2 border-gray-400 px-4 pz-2 w-full"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleBook}>
            Save Book
          </button>
        </div>
      )}
    </div>
  );
};
export default CreateBook;
