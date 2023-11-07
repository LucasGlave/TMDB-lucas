const express = require("express");
const app = express();
const routes = require("./routes");
const db = require("./config/db");
const PORT = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

db.sync({ force: false }).then(() =>
  app.listen(PORT, () => console.log("Listening on PORT", PORT))
);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});
