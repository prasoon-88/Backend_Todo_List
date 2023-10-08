import { app } from "./app.js";
import connectToDb from './data/database.js'


connectToDb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is Working on PORT ${process.env.PORT} in ${process.env.NODE_ENV}`)
})