require('dotenv').config()
import app from "./app";

const PORT = process.env.PORT || 8080.
app.listen(PORT , () => {
    console.log("Listening from port: ",PORT)
})
