
import fs from "fs";



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
    updateProduct(id, changes) {
        if (fs.existsSync(this.path)) {
            let productsArray = JSON.parse(fs.readFileSync(this.path, "utf8"));
            const product = productsArray.findIndex(prod => prod.id === id);
    
            if (product === -1) {
                console.error("El producto no existe");
                return null; 
            }
            for (const [key, value] of Object.entries(changes)) {
                productsArray[product][key] = value;
            }
    
        
            fs.writeFileSync(this.path, JSON.stringify(productsArray));
    
           
            return productsArray[product];
        } else {
            console.error("El archivo no existe");
            return null; 
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

  