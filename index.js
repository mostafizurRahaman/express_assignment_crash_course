const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const usersRouter = require("./route/v1/users.route");
//  create an app :
const app = express();
const port = process.env.PORT || 5000;

//  middleware function :
app.use(cors());
app.use(express.json());

//  routes  are here :
app.use('/api/v1/users', usersRouter)
//  the root api of server:

app.get("/", (req, res) => {
   res.send("Server is running now");
});

app.all("*", (req, res) => {
   res.send("So Sad, Api  doesn't exit now");
});

// error handled middleware :
app.use(errorHandler);

//  listen the server:
app.listen(port, () => {
   console.log("server is running now on port " + port);
});

//  express error handling
process.on("unhandledRejection", (error) => {
   console.log(error.name, error.message);
   app.close(() => {
      process.exit(1);
   });
});
