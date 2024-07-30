import { Book } from "../models/book.js";

//route for getting all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

//route for getting single book
export const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(400).send({ message: "No book found" });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

//route for creating book
export const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

//route for update book
export const updateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await Book.findById(id);
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book =await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send({ message: "Book is successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: err.message });
    console.log(err.message);
  }
};
