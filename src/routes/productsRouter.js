import { Router } from "express";
import Productos from "../../index.js";
import { uploader } from "../utils.js";

const router = Router()

router.get("/",(req, res)=>{
    res.send(Productos.getProducts());
})

router.get("/",(req, res)=>{
    const idProduct = req.params.idProduct;
    let producto = Productos.getProductById(idProduct)
    if(!producto){
        return res.status(400).send({
            error:"Producto no encontrado"
        }) 
    }
    return res.send(producto)
})
router.get("/", (req, res) => {
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

router.put("/api/update/:id",(req, res)=>{
    const  {id}  = req.params;
    console.log('====================================');
    console.log(id);
    console.log('===================================='); 
    const changes = req.body; 
    delete changes.id;
    const updatedProduct = Productos.updateProduct(id, changes);
    if (updatedProduct) {
        res.json({ message: 'Producto actualizado con éxito', updatedProduct });
    } else {
        res.status(404).json({ error: 'Producto no encontrado o error al actualizar' });
    }
});

router.delete("/api/delete/:idProduct",(req, res)=>{
    const   id   = req.params.idProduct;
    if(!id){
        res.status(404).json({ error: 'requiere indicar un id para eliminar' });
    }
    
    Productos.deleteProduct(id)
    res.status(201).send({message: `producto ${id} se elimino correctamente`})

    

   

})



export default router;