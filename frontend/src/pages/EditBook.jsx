import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`).then((res) => {
      setAuthor(res.data.author);
      setTitle(res.data.title);
      setPublishYear(res.data.publishYear);
      setLoading(false)
    }).catch((err)=>{
      setLoading(false)
      alert("An error happened. Please check console.")
      console.log(err)
    })
  },[]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);

    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        // console.log(res);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
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
      <h1 className="text-3xl my-4">Edit Book</h1>
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
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
            Save Book
          </button>
        </div>
      )}
    </div>
  );
};
export default EditBook;
