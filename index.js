
const { log } = require("console");
const fs = require("fs");
const { title } = require("process");
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
    
        addProduct(title, description, price, thumbnail, code, stock, id) {
        // Convertir el código a un entero
        const codeAsInt = parseInt(code);
        // Verificar si el código es un número
        if (isNaN(codeAsInt)) {
            console.log("El código debe ser un entero.");
            return;
        }
    
        // Buscar un producto existente con el mismo código
        const existingProduct = this.products.find((prod) => prod.code === codeAsInt);
        // Verificar si ya existe un producto con el mismo código
        if (existingProduct) {
            console.log("El producto ya existe.");
            return existingProduct;
        }
    
        // Crear un nuevo producto
        const newProduct = {
            id: id !== undefined ? id : ProductManager.id, // Utilizar el id proporcionado o generar uno nuevo
            title,
            description,
            price,
            thumbnail,
            stock,
            code: codeAsInt,
        };
    
        // Agregar el nuevo producto a la lista de productos
        this.products.push(newProduct);
        // creamos el archivo products.json y se agrego el array de productos
        fs.writeFileSync(this.path, JSON.stringify(this.products))
        
    
        // Incrementar el contador de id si no se proporcionó un id específico
        if (id === undefined) {
            ProductManager.id++;
        } else {
            console.log("Producto actualizado correctamente.");
        }
    
        // Mostrar mensajes de éxito
        console.log("Producto agregado correctamente.");
        return newProduct; // Devolver el nuevo producto
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




const Producto = new ProductManager("Tienda chino","../Desafios/products.json");

    




    setTimeout(() => {
        const nuevoProducto = Producto.addProduct("Crema Corporal", "Descripción2", 2500, "linkDeLaImagen", 12343, 8, 6);
        const nuevoProducto2 = Producto.addProduct("Crema Corporal2", "Descripción2", 2500, "linkDeLaImagen2", 12346, 22, 4);
        const nuevoProducto3 = Producto.addProduct("Crema Corporal3", "Descripción3", 300, "linkDeLaImagen3", 12345, 10, 3); // Esto mostrará el mensaje de producto existent
        console.log('=================Producto.getProducts()===================');
        console.log(Producto.getProducts());
        console.log('==============Producto.getProducts()======================'); 
        console.log('=================getProductById(6)===================');
        console.log(Producto.getProductById(6));
        console.log('================getProductById(6)===================='); 

   
        console.log('================actualizacion====================');
        // las propiedades para editar son (id, atributo que vamos a actulazr, actualizacion)
        console.log(Producto.updateProduct(6,"title","titulo actualizado"));
        console.log('===================actualizacion=================');

        console.log('=================getProductById(6)Actualizado===================');
        console.log(Producto.getProductById(6));
        console.log('================getProductById(6)Actualizado===================='); 
        
        Producto.deleteProduct(3)
        console.log('=================eliminamos el producto con id 3===================');
        console.log(Producto.getProducts());
        console.log('==============eliminamos el producto con id 3======================'); 

    }, 1000);
