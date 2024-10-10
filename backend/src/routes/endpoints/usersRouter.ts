// src/routes/users.ts

import * as express from "express";
import controller from "../controllers/usersRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const usersRouter = express.Router();




export default usersRouter;
