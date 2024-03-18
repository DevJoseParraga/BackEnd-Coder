
import fs from "fs";

import  Express  from "express";

const app = Express()
app.use(Express.urlencoded({extended:true}));


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
    addProduct(title, description, price, thumbnail, code, stock, id, status, category) {
        const codeAsInt = parseInt(code);
        
        if (isNaN(codeAsInt)) {
            console.log("El código debe ser un entero.");
            return;
        }
    
        let products = Productos.getProducts(); 
    
        
    
        const newProduct = {
            id: id !== undefined ? id : ++ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            stock,
            status,
            category,
            code: codeAsInt,
        };
    
        products.push(newProduct); 
    
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2)); 
    
        console.log("Producto agregado correctamente.");
        return newProduct;
    }
    

    
    //     addProduct(title, description, price, thumbnail, code, stock, id) { // Convertir el código a un entero
    //     const codeAsInt = parseInt(code);
        
    //     if (isNaN(codeAsInt)) {
    //         console.log("El código debe ser un entero.");
    //         return;
    //     }
    
       
    //     const existingProduct = this.products.find((prod) => prod.code === codeAsInt);
       
    //     if (existingProduct) {
    //         console.log("El producto ya existe.");
    //         return existingProduct;
    //     }
    
        
    //     const newProduct = {
    //         id: id !== undefined ? id : ProductManager.id, 
    //         title,
    //         description,
    //         price,
    //         thumbnail,
    //         stock,
    //         code: codeAsInt,
    //     };
    
       
    //     this.products.push(newProduct);
       
    //     if (fs.existsSync(this.path)) {
    //         let arr = []
    //         let productsJson = fs.readFileSync("./products.json", "utf8")
    //         arr = JSON.parse(productsJson)
    //         arr.push(newProduct)
    //         this.products.push(newProduct);
    //         fs.writeFileSync(this.path, JSON.stringify(this.products))
      

    //     }else{
    //         fs.writeFileSync(this.path, JSON.stringify(this.products))
    //     }
        
    
       
    //     if (id === undefined) {
    //         ProductManager.id++;
    //     } else {
    //         console.log("Producto actualizado correctamente.");
    //     }
    
        
    //     console.log("Producto agregado correctamente.");
    //     return newProduct; 
    // }
    

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
 
const Productos = new ProductManager("Tienda chino","../Desafios/products.json");


export default Productos 
// setTimeout(() => {
//         console.log('=================Producto.getProducts()===================');
//         console.log(Productos.getProducts());
//         console.log('==============Producto.getProducts()======================'); 
//         console.log('=================getProductById(6)===================');
//         console.log(Productos.getProductById(3));
//         console.log('================getProductById(6)===================='); 

   
//         console.log('================actualizacion====================');
//         // las propiedades para editar son (id, atributo que vamos a actulazr, actualizacion)
//         console.log(Productos.updateProduct(3,"title","titulo actualizado"));
//         console.log('===================actualizacion=================');

//         console.log('=================getProductById(6)Actualizado===================');
//         console.log(Productos.getProductById(3));
//         console.log('================getProductById(6)Actualizado===================='); 

//         Productos.deleteProduct(3)
//         console.log('=================eliminamos el producto con id 3===================');
//         console.log(Productos.getProducts());
//         console.log('==============eliminamos el producto con id 3======================'); 

//     }, 2000);

//     app.get("/api/products",(req, res)=>{
//         res.send(Productos.getProducts());
//     })

//     app.get("/api/products/:idProduct",(req, res)=>{
//         const idProduct = req.params.idProduct;
//         let producto = Productos.getProductById(parseInt(idProduct))
//         if(!producto){
//             return res.send({
//                 error:"usuario no encontrado"
//             }) 
//         }
//         return res.send(producto)
//     })
//     app.get("/api/product", (req, res) => {
//         const { limit } = req.query; 
//         const allProducts = Productos.getProducts(); 
//         const limitedProducts = limit ? allProducts.slice(0, parseInt(limit, 10)) : allProducts; 
//         res.send(limitedProducts);
//     });   
// const PORT = 8080;
// app.listen(PORT,()=>{
//     console.log('====================================');
//     console.log("servidor activo en http://localhost:"+PORT);
//     console.log('====================================');
// })    