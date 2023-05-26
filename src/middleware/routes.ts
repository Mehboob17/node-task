//framework
import express from "express";
const router = express.Router();

//routes
import systemUserRoutes from "../routes/user.route";


const SYSTEM_USERS_ROUTE = "/users";
// const USERS_ROUTE = "/users";


router.use(SYSTEM_USERS_ROUTE, systemUserRoutes);

export default router;
