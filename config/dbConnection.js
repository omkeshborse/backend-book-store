import mongoose from "mongoose";
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/bookstore";

const connectToDB = async () => {
  mongoose
    .connect(MONGO_URL)
    .then((conn) => {
      console.log(`connected to DB => ${conn.connection.host}`);
    })
    .catch((error) => {
      resizeBy.status(200).json({
        success: true,
        message: error.message,
      });
      process.exit(1);
    });
};

export default connectToDB;
