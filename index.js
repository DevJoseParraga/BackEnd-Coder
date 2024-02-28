class ProductManager {
    static id = 0;
    Nombre;
    products;

    constructor(Nombre) {
        this.Nombre = Nombre;
        this.products = [];
    }

    productsConstructor(title, description, price, thumbnail, code, stock, id) {
        
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

        const NuevoProduct = {
            id: id !== undefined ? id : ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            stock,
            code: codeAsInt,
        };

        this.products.push(NuevoProduct);
        if (id === undefined) {
            ProductManager.id++;
        } else {
            console.log("Producto actualizado correctamente.");
        }

        console.log("Producto agregado correctamente.");
        return NuevoProduct;
    }

    getProducts() {
        return this.products;
    }

    getById(id) {
        return this.products.find((prod) => prod.id === id) || "Producto no encontrado.";
    }
}

const Producto = new ProductManager("Tienda chino");
const nuevoProducto = Producto.productsConstructor("Crema Corporal", "Descripción", 250, "linkDeLaImagen", 12345, 22, 3);
const nuevoProducto2 = Producto.productsConstructor("Crema Corporal2", "Descripción2", 2500, "linkDeLaImagen2", 12346, 22, 4);
const nuevoProducto3 = Producto.productsConstructor("Crema Corporal3", "Descripción3", 300, "linkDeLaImagen3", 12345, 10, 3); // Esto mostrará el mensaje de producto existente
console.log(Producto.getProducts(5));
