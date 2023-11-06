import mongoose,{Schema} from "mongoose";


const TodoSchema:Schema = new Schema({
    user_id: {
        type:String,
        required:true
    },
    todos: [{
        context:{
            type:String,
            required:true
        },
        completed:{
            type:Boolean,
            required:false
        }
    }],
    
})


export default mongoose.model("Todo",TodoSchema);