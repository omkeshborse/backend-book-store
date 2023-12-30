import { config } from "dotenv";
config() ;
import app from "./app.js";
import connectToDB from "./config/dbConnection.js";

const PORT = process.env.PORT|| 5001 ;

app.listen(PORT , ()=>{
    connectToDB();
    console.log(`App listen on http://localhost:${PORT}`);
})