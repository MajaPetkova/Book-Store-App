import express, { json } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBUrl } from "./config.js";
import { Book } from "./models/book.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {});

app.post("/books", async (req, res) => {
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
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection failed");
  });
