/*****************************************************
                    EXPRESS.JS 
# npm init -y 
# npm i express dotenv
# npm i mongoose             
# npm i express-async-errors
/****************************************************/
const connectDB = require("./src/configs/db");
const express = require("express");
const app = express();

/****************************************************/

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

// DB Connection
connectDB();

/****************************************************/

// Middlewares:

// Parses JSON request bodies.
app.use(express.json());

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

/****************************************************/
// Routes

app.use("/", require("./src/routes/index"));

app.all("*", (req, res, next) => {
  throw new Error(`Can't find ${req.originalUrl} on this server!`, 404);
});

// StaticFile:
// app.use("/images", express.static("./uploads"));

/****************************************************/

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/****************************************************/

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
