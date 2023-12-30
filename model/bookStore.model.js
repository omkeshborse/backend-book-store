import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book Title is required"],
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      required: [true, "The author's name for the book is mandatory."],
      trim: true,
      minLength: [
        5,
        "The author's name must consist of a minimum of 5 characters.",
      ],
    },
    publishYear: {
      type: Number,
      required: [true, "The publication year is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

export default Book;
