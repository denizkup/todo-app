import mongoose,{Mongoose} from "mongoose";

export class DatabaseAdaptor{
    database_url:string;
    connection:Mongoose|null;

    constructor(url:string){
        this.database_url = url;
        this.connection = null;
    }

    async connect(){
        try{
            console.log("Waiting for database connection....");
            this.connection = await mongoose.connect(this.database_url);
            console.log("Database connection established successfuly!");
        }
        catch(error){
            console.error("Failed to connect database! ", error);
        }

        return this.connection
    }
}