import express from "express"
import cors from "cors"
import bikeRouter from "./controllers/bikeRouter"


const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors({
    origin : "*" ,
    methods : ["GET" , "PUT" , "POST" , "PATCH" , "DELETE"],
    allowedHeaders : ["Content-Type" , "Authorization"]
}))




app.use("/api/v1",bikeRouter)





app.listen(port,()=>{
    console.log(`server started on port : ${port}`)
})