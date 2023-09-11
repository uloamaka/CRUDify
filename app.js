const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

require("dotenv").config();
const connectDB = require("./db/connect");

const v1Router = require("./routes/index");
app.use("/", v1Router);



const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
