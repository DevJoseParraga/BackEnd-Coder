import fs from "fs";

class cartManager {
    static id = 0;
    products;
    path;

    constructor(path ) {
        this.path = path
    }

    createCart(){
        const newCartId = Math.floor(Math.random() * 1000000) + Date.now();

        const newCart = 
            {
            id: newCartId,
            products: []
            }
        ;
        
         const carts = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path, 'utf-8')) : [];
        carts.push(newCart); 
      
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2)); 
    
        console.log("nuevo carrito creado" + carts);
        return carts;
    }
    
    addProdCart( cId, pId){
        let carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        let cartFilter = carts.findIndex((cart) => cart.id == cId)
        let producFilter = carts[cartFilter].products.findIndex(p => p.productId == pId);

        if (producFilter !== -1) {
            
            carts[cartFilter].products[producFilter].quantity += 1;
        } else {
        
            const newProduct = {
                productId: pId,
                quantity: 1
            };
            carts[cartFilter ].products.push(newProduct);
        }
    
    
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
        
    }

}
const Cart = new cartManager("../Desafios/carts.json")


// Cart.addProdCart(1710826660185, 5)





export default Cart; 
