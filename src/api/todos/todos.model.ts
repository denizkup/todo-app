import mongoose,{Schema} from "mongoose";
import { TodoType } from "../../types/todo.type";
const TodoSchema:Schema = new Schema({
    user_id: {
        type:String,
        required:true
    },
    todos: [{
        context:{
            type:String,
            required:true
        }
    }]
})


export default mongoose.model("Todo",TodoSchema);