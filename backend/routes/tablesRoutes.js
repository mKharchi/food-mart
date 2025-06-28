import { addTable, listTables } from "../controllers/tablesController.js";

import express from "express";
import adminAuth from "../middleware/adminAuth.js";

const tablesRouter = new express.Router()

tablesRouter.post('/list', adminAuth,  listTables)
tablesRouter.post('/add' , adminAuth,  addTable)


export default tablesRouter