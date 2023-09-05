import mongoose,{Schema} from "mongoose";

const TodoSchema:Schema = new Schema({
    todo: {
        type:String,
        required:true,
    }
})


export default mongoose.model("Todo",TodoSchema);