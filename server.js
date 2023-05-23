import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoute.js"
import errormiddleware from "./middleware/error.js"

//configure env

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to uncaught exception`)
})


//databse config
dotenv.config();
connectDB();

//rest object
const app = express();

//middelwares
//middleware for error
app.use(errormiddleware)
app.use(express.json());



//routes

app.use("/api/v1/product", productRoutes);



//PORT
const PORT = process.env.PORT || 5002;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`
      
  );
});




//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error :${err.message}`)
    console.log("shtting down the server")
    server.close(()=>{
        process.exit(1);
    })
})