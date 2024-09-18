import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    phone:String,
    password:String,
    tokenUser:String,
    avatar:String,
    status:{
        type:String,
        default:'active'
    },
    deleted:{
        type:Boolean,
        default:false
    },
    acceptFriends:Array,
    requestFriends:Array,
    listFriends:Array,
    statusOnline:String
},{
    timestamps:true
}
)
const User= mongoose.model('User',userSchema,'users');
export default User;