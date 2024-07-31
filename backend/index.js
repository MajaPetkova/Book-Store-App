import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBUrl } from "./config.js";
import books from "./routes/book.route.js";
import cors from "cors"


const app = express();
//middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// middleware for handling CORS policy
// Option 1: Allow all origin with default of cors
app.use(cors())
// Option 2: Allow custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods:["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"]
//     })
// )

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
