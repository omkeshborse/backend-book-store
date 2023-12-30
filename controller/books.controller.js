import Book from "../model/bookStore.model.js";
import AppError from "../utils/appError.js";

const createBook = async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return next(new AppError("All field are required", 400));
    }
    const bookExists = await Book.findOne({ title });
    if (bookExists) {
      return next(
        new AppError(
          "A book with the same name already exists. Please choose a different name and try again.",
          400
        )
      );
    }
    const book = await Book.create({ title, author, publishYear });
    if (!book) {
      return next(
        new AppError("Book creation unsuccessful. Please Try again.")
      );
    }
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getAllBook = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      message: "all books successfully get",
      books: books,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getBookByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return next(new AppError("Book does not exists wit this id",400));
    }
    res.status(200).json({
      success: true,
      message: `book successfully get`,
      book,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!book) {
      return next(new AppError("Book does not  exists ", 404));
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      res.status(200).json({
        success: true,
        message: "Book with this id Does not exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book delete successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export { createBook, getAllBook, updateBook, deleteBook, getBookByID };
