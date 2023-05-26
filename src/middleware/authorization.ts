import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export default async function authorization(req, _res, next) {
  const db = mongoose.connection;
  try {
    const roleData = await db
      .collection("roles")
      .find({ _id: new ObjectId(req.user.role) })
      .toArray();
    if (!roleData.length) throw new Error("Access denied");
    if (!roleData[0]["access"][req.baseUrl][req.method.toLowerCase()])
      throw new Error("Access denied");
  } catch (error) {
    const { id } = req.params;
    // console.log(req.user);
    if (req.method.toLowerCase() == "delete") return next(error);
    if (!(id == req.user.id)) return next(error);
  }
  next();
}
