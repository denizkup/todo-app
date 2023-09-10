import mongoose,{Schema} from "mongoose";
import { any } from "zod";

const SessionSchema:Schema = new Schema({
    session_id: {
        type:String,
        required:true,
    },
    data: {
        type: Object,
        required:true,
    },
})

export default mongoose.model("Session",SessionSchema);