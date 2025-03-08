const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const port = process.env.PORT;

// Middleware
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());

//routes
require("./routes/fcm.route")(app);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,x-access-token,authorization"
  );

  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  res.end();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).jsonp("Internal server error!");
});

// Start the server
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});