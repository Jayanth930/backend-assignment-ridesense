import express from "express"
import { getAllBikes , addnewBike , updateBike, deleteBike } from "../services/bikeQuery"

const router = express.Router();



// Get's all the bikes from the db
router.get("/bikes",getAllBikes)



// Add new Bike 
router.post("/bikes",addnewBike)


// Update details of existing bike
router.put("/bikes/:id",updateBike)

// Delete a specific bike 
router.delete("/bikes/:id",deleteBike)


export default router