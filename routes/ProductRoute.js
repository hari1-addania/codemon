import express from "express"
import { createProductController, getProductController, getSingleProductController, updateProductController } from "../controllers/productController.js";



const router= express.Router()


router.post(
    "/create-product",
    createProductController
  );


  router.put(
    "/update-product/:pid",
    updateProductController
  );


  router.get("/get-product", getProductController)
router.get("/get-product/:id",getSingleProductController)

export default router