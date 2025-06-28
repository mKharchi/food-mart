import express from 'express'
import { makeReservation ,listAllReservations , deleteReservation , listAvailableSlots, listReservation ,  updateReservation, cancelReservation} from '../controllers/reservationController.js'
import authUser from '../middleware/userAuth.js'
import adminAuth from '../middleware/adminAuth.js'

const reservationRouter = new express.Router()

reservationRouter.post("/make" , authUser , makeReservation)
reservationRouter.post("/list" , listAvailableSlots)
reservationRouter.post("/list-reservations" , authUser ,listReservation)
reservationRouter.put("/update" , authUser ,updateReservation)
reservationRouter.post("/cancel" , authUser ,cancelReservation)
reservationRouter.post("/delete" , adminAuth ,deleteReservation)
reservationRouter.post("/" , adminAuth ,listAllReservations)


export default reservationRouter