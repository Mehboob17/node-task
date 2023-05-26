/* Connecting to mongoDB */
import mongoose, { ConnectOptions } from "mongoose";
import { server } from "./config";
import getMessages from "./messages";
const { database } = server;
const { DATABASE_CONNECT_SUCCESS, RESOURCE_CONNECT_FAILURE } =
  getMessages("Database");

mongoose.set("debug", true);
mongoose.set("strictQuery", false);
export default mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(
    () => console.log(DATABASE_CONNECT_SUCCESS),
    (error) => {
      console.log(RESOURCE_CONNECT_FAILURE);
      console.log(error);
    }
  );
