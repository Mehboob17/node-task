//framework
import express from "express";
import {
  get,
  login,
  register,
  put,
  post,
  getOne,
  remove,
} from "../controllers/users.controller";
import authorization from "../middleware/authorization";
const router = express.Router();

router.route("/register").post(register);
// router.route("/:id").put(put).delete(put);
router.route("/login").post(login);
router.route("/").get(authorization, get).post(authorization, post);
router.route("/:id").get(authorization, getOne).put(authorization, put).delete(authorization,remove);

// router.route("/forgot-password").post(forgotPassword);

export default router;
