import mongoose,{Schema} from "mongoose";

const UserSchema:Schema = new Schema({
    email: {
        type:String,
        required:true,
    },
    username: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    lastname: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    create_date: {
        type:String,
        required:true,
    },
    auth_level: {
        type:String,
        required:false,
    }
})

export default mongoose.model("User",UserSchema);