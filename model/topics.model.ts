import mongoose from "mongoose";
const topicSchema = new mongoose.Schema({
    title:String,
    avatar:String,
    description:String,
    status:String,
    slug:{
        type:String,
        slug:"title",// Tạo slug từ trường title
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:Date,
},{
    timestamps:true
}
)
const Topic= mongoose.model('Topic',topicSchema,'topics');
export default Topic;