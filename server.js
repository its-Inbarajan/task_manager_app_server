const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const usersRoute = require("./routes/userRoutes/usersRoutes");
require("dotenv").config();
const app = express();
// config
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Apis
app.get("/", (req, res) => {
  res.send("your server is now working!");
});

app.use("/api/users", usersRoute);
app.use("/api/tasks", usersRoute);

// connections
mongoose
  .connect(process.env.MONGO_DB)
  .then(
    app.listen(process.env.PORT ?? 4200, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`); // Use the PORT variable for logging
    })
  )
  .catch((err) => console.log(err));
