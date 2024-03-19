import { Router } from "express";
import Cart from "../cartManager.js"


const router = Router()

router.post("/", (req, res)=>{
   const cart = Cart.createCart()
    res.send("carrito creado correctamente" + cart)
})

router.post("/:cid/product/:pid", (req,res)=>{
    
    let {cid, pid} = req.params;

    Cart.addProdCart(cid, pid)


})

export default router;