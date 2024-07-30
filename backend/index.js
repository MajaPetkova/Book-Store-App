import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBUrl } from "./config.js";
import books from "./routes/book.route.js" 


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/books", books)


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
