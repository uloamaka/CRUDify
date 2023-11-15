const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

require("dotenv").config();
const connectDB = require("./db/connect");

const v1Router = require("./routes/index");
app.use("/", v1Router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crudify Api",
      version: "1.0.0",
      description: "A simple Express CRUD API, on a persons name.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "dev server"
      },
      {
        url: "https://crudify.onrender.com",
        description: "production server",
      },
    
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI || "");
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
