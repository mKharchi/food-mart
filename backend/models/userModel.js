import { model, Schema } from "mongoose";

const userSchema  = new Schema({
    username:{type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true},
    reservations:{type:Array , default:[]}
})

const User = new model('User' , userSchema)
export default User