require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// middelware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Store API 🛍️</h1><a href='/api/v1/products'>Products Route</a>");
});

app.use("/api/v1/products", productsRouter);
// app.use("/api/v1/products/static", productsRouter);

// Products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const { PORT } = process.env || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`Server is listening on port: http://localhost:${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
