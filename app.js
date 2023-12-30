import express, { urlencoded } from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import cors from "cors";
import bookRoutes from "./routes/books.routes.js";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 1 all urls allows to make requests
app.use(cors());

// 2 to specific url
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(morgan("dev"));
app.use("/ping", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Pong",
  });
});
// routes for book
app.use("/api/v1/books", bookRoutes);

app.use("*", (req, res) => {
  res.status(400).send("OOps ! page not found");
});
app.use(errorMiddleware);

export default app;
