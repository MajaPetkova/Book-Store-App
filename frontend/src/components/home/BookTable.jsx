import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import {  MdOutlineDelete } from "react-icons/md";


const BookTable = ({books}) => {
  return (
    <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <td className="border border-slate-600 rounded-md text-center">
                No
              </td>
              <td className="border border-slate-600 rounded-md text-center">
                Title
              </td>
              <td className="border border-slate-600 rounded-md max-md:hidden text-center">
                Author
              </td>
              <td className="border border-slate-600 rounded-md max-md:hidden text-center">
                Publish Year
              </td>
              <td className="border border-slate-600 rounded-md text-center">
                Operations
              </td>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-green-800 text-2xl" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600"></AiOutlineEdit>
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600"></MdOutlineDelete>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default BookTable