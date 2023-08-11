import cookieParser from "cookie-parser";
import express from "express";
import corsMiddleware from "./middlewares/cors.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import helmetMiddleware from "./middlewares/helmet.middleware";
import metricsMiddleware from "./middlewares/metrics.middleware";
import startTime from "./middlewares/startTime.middleware";
import transactionId from "./middlewares/transactionId.middleware";
import apiRouter from "./routes/api";
import statusRouter from "./routes/status";
import Logger from "./utils/log";

const app = express()
  .use(transactionId())
  .use(startTime())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(helmetMiddleware())
  .use(Logger.logIncomingRequest)
  .use(corsMiddleware())
  .use(metricsMiddleware())
  .use("/api", apiRouter)
  .use("/__status__", statusRouter)
  .use("/", (req, res, next) => res.send("Hello World!"))
  .use(errorHandler());

export default app;
