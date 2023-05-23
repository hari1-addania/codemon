import ProductModel from "../models/ProductModel.js";


export const createProductController = async (req, res) => {
    try {
      const { name, description, price } =
        req.body;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        
      }
  
      const products = new ProductModel(req.body);
      
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing product",
      });
    }
  };



  export const getProductController = async(req,res)=>{
    try {
        const products = await ProductModel.find()
        
        res.status(200).send({
            counTotal:products.length,
            success:true,
            message:"All products ",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product",
          });
    }
  }



  export const getSingleProductController = async(req,res)=>{
    try {
        
        const product= await ProductModel.findOne({_id:req.params.id})
        
        res.status(200).send({
            success:true,
            message:"single product fetched ",
            product,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single product",
          });
    }
}



export const updateProductController = async(req,res)=>{
    try {
        const { name, description, price} =
          req.body;
        
        //validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          
        }
    
        const products = await ProductModel.findByIdAndUpdate(req.params.pid,{
            name:req.body.name,
            price:req.body.price,
            description:req.body.description
        },{new:true})
        
        await products.save();
        res.status(201).send({
          success: true,
          message: "Product updated Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in updating product",
        });
      }



}