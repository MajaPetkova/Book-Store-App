import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BookTable from "../components/home/BookTable";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-700 px-4 py-1 rounded-lg hover:text-white"
          onClick={() => {
            setShowType("table");
          }}
        >
          Show Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-700 px-4 py-1 rounded-lg hover:text-white"
          onClick={() => {
            setShowType("cards");
          }}
        >
          Show Cards
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-700 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books}/>
      )}
    </div>
  );
};

export default Home;
