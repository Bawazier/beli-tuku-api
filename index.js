require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const { APP_PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Backend is running well",
  });
});

app.listen(APP_PORT, () => {
  console.log(`app listen on port ${APP_PORT}`);
});

// provide static file
app.use("/assets/uploads/", express.static("assets/uploads"));

const homeRouter = require("./src/routes/home");
const customerRouter = require("./src/routes/customer");
const sallerRouter = require("./src/routes/saller");
const auth = require("./src/routes/auth");

// // attach member router
app.use("/auth", auth);
app.use("/public", homeRouter);

// // //Customer auth
const customerAuth = require("./src/middlewares/auth");
const validation = require("./src/middlewares/rolesValidation");
app.use("/customer", customerAuth, validation.customer, customerRouter);
app.use("/seller", customerAuth, validation.saller, sallerRouter);
