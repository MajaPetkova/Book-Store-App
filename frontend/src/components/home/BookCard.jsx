import Card from "./Card";

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((x) => (
        <Card book={x} key={x._id} />
      ))}
    </div>
  );
};

export default BookCard;
