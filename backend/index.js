import express, { json } from "express";
import cors from "cors";
import connectDb from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import tablesRouter from "./routes/tablesRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";
import menuRouter from "./routes/menuRoutes.js";

const app = express();



app.use(cors());
app.use(json())
app.use('/users' , userRouter)
app.use('/tables' ,tablesRouter)
app.use('/reservations' ,reservationRouter)
app.use('/menu' , menuRouter)



app.get("/", (req, res) => {
  res.send("Hello World");
});



connectDb();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

