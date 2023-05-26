/* .env setup */
import { server } from "./app/config";
const { port } = server;

/* express package setup */
import express, { Express, Request, Response } from "express";
// import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
const app: Express = express();
app.use(express.json()); // parse json bodies in the request object
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(fileUpload());
app.use(cookieParser());

// /* Connecting to mongoDB */
import mongooseConnect from "./app/mongoose-connect";
mongooseConnect;

import cors from "cors";

app.use(
  cors({
    origin: "*",
  })
);

// generic
import getMessages from "./app/messages";
const { SERVER_STARTED } = getMessages("Server");

//Routes
import authentication from "./middleware/authentication";
import routes from "./middleware/routes";
import ErrorHandler from "./middleware/error-handler.middleware";
app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/", authentication, routes);
app.listen(port, () => {
  console.log(`⚡️[server]: ${SERVER_STARTED} ${port}`);
});

app.use(ErrorHandler);
