import { Router } from "express";
import Productos from "../../index.js";
import { uploader } from "../utils.js";

const router = Router()

router.get("/",(req, res)=>{
    res.send(Productos.getProducts());
})

router.get("/api/products/:idProduct",(req, res)=>{
    const idProduct = req.params.idProduct;
    let producto = Productos.getProductById(parseInt(idProduct))
    if(!producto){
        return res.status(400).send({
            error:"Producto no encontrado"
        }) 
    }
    return res.send(producto)
})
router.get("/api/product", (req, res) => {
    const { limit } = req.query; 
    const allProducts = Productos.getProducts(); 
    const limitedProducts = limit ? allProducts.slice(0, parseInt(limit, 10)) : allProducts; 
    res.status(200).send(limitedProducts);
}); 

router.post("/",uploader.array("thumbnail"), (req, res)=>{
   
    const{title, description, price, code, stock, id, status, category } = req.body
    const thumbnailFiles = req.files
 
 
    if(!title || !description || !price || !thumbnailFiles  || !code || !stock || !id || !status || !category ){
        return res.status(400).send({
            error: "faltan datos para crear el producto"
        })
    }
        const thumbnail = thumbnailFiles.map(obj => obj.path)

        let products = Productos.getProducts(); 
        const existingProduct = products.find((prod) => prod.id == id);
      
        
        if (existingProduct) {
          
            return res.status(200).send({message: `producto ${title} ya existe`})
            ;
        }else{
            Productos.addProduct(title, description, price, thumbnail, code, stock, id, status, category);
            res.status(201).send({message: `producto ${title} creado correctamente`})
        }

})

export default router;