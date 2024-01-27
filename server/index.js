import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dbConnect } from "./dbConfig/index.js";
import router from "./routes/index.js";
/*
{
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  }
*/
import errorMidleware from "./middlewares/errorMiddleware.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
dbConnect();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);
app.use(errorMidleware);
app.listen(port, () => {
  console.log("Server Running\n" + port);
});
