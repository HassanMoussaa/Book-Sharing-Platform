const express = require("express")
const app = express();
require("dotenv").config()

const mongoDb = require("./configs/mongodb.connection");

// read json
app.use(express.json())

const usersRoutes = require("./routes/users.route")
app.use("/users", usersRoutes)

const authRoutes = require("./routes/auth.route")
app.use("/auth", authRoutes)

const bookRoutes = require("./routes/book.route")
app.use("/books", bookRoutes)

app.listen(8000, (err) => {
  if (err) {
    throw err
  }
  mongoDb()

 
  console.log("server is running on port: ", 8000)
})