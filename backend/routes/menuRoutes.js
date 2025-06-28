import express from 'express'
import { addItem, getMenu, updateItem, removeItem } from '../controllers/menuController.js'
import adminAuth from "../middleware/adminAuth.js"
const menuRouter = express.Router()

menuRouter.post('/add',  adminAuth , addItem)
menuRouter.get('/',   getMenu)
menuRouter.put('/:id',  adminAuth , updateItem)
menuRouter.post('/:id',  adminAuth , removeItem)

export default menuRouter
