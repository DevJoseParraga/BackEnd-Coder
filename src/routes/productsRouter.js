import { Router } from "express";
import fs from "fs";

const router = Router()
class ProductManager {
    static id = 0;
    Nombre;
    products;
    path;

    constructor(Nombre, path ) {
        this.Nombre = Nombre;
        this.products = [];
        this.path = path
    }
    
        addProduct(title, description, price, thumbnail, code, stock, id) { // Convertir el código a un entero
        const codeAsInt = parseInt(code);
        
        if (isNaN(codeAsInt)) {
            console.log("El código debe ser un entero.");
            return;
        }
    
       
        const existingProduct = this.products.find((prod) => prod.code === codeAsInt);
       
        if (existingProduct) {
            console.log("El producto ya existe.");
            return existingProduct;
        }
    
        
        const newProduct = {
            id: id !== undefined ? id : ProductManager.id, 
            title,
            description,
            price,
            thumbnail,
            stock,
            code: codeAsInt,
        };
    
      
        this.products.push(newProduct);
        
        fs.writeFileSync(this.path, JSON.stringify(this.products))
        
    
       
        if (id === undefined) {
            ProductManager.id++;
        } else {
            console.log("Producto actualizado correctamente.");
        }
    
        
        console.log("Producto agregado correctamente.");
        return newProduct; 
    }
    

    getProducts() {
        if (fs.existsSync(this.path)) {
            let arr = []
            let productsJson = fs.readFileSync("./products.json", "utf8")
            arr = JSON.parse(productsJson)
            return arr 
        } else{
            return this.products
        }
      
    }

    getProductById(id) {
        if (fs.existsSync(this.path)) {
            let arr = []
            let productsJson = fs.readFileSync("./products.json", "utf8")
            arr = JSON.parse(productsJson)
      
            let arrFiltrado = arr.find((prod) => prod.id === id)
            return arrFiltrado
        } else{
            console.error("el producto no existe")
        }
         
    }

    updateProduct(id, atributo, cambio){
        if (fs.existsSync(this.path)) {
            let arr = []
            let productsJson = fs.readFileSync("./products.json", "utf8")
            arr = JSON.parse(productsJson)
            let arrFiltrado = arr.find((prod) => prod.id === id)
            arrFiltrado[atributo] = cambio
            fs.unlinkSync(this.path)
            fs.writeFileSync(this.path, JSON.stringify(arr))

            return arrFiltrado[atributo]
        } else{
            console.error("el producto no existe")
        }  
    }
    
    
    deleteProduct(id){
        if (fs.existsSync(this.path)) {
            let arr = []
            let productsJson = fs.readFileSync("./products.json", "utf8")
            arr = JSON.parse(productsJson)
            let arrFiltrado = arr.filter((prod) => prod.id !== id)
            let nuevoArr = arrFiltrado
      
            fs.unlinkSync(this.path)
            
                fs.writeFileSync(this.path, JSON.stringify(nuevoArr)) 
                
            
            
        }
      
        
    }
}
 

const Productos = new ProductManager("Tienda chino","/products.json");
router.get("/",(req, res)=>{
    res.send(Productos.getProducts());
})

router.get("/",(req, res)=>{
    const idProduct = req.params.idProduct;
    let producto = Productos.getProductById(parseInt(idProduct))
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

router.post("/", (req, res)=>{
    const{title, description, price, thumbnail, code, stock, id } = req.body

    if(!title || !description || !price || !thumbnail || !code, !stock || !id ){
        return res.status(400).send({
            error: "faltan datos para crear el producto"
        })
    }
    Productos.addProduct(title, description, price, thumbnail, code, stock, id);
    res.status(201).send({message: "producto creado correctamente"})
})

export default router;