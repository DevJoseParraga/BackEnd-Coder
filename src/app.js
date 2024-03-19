import  express  from "express";
import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// use productsRouter
app.use("/", productsRouter)
app.use("/api/idproduct", productsRouter ) 
app.use("/api/products/:idProduct", productsRouter )
app.use("/", productsRouter )
app.use("/api/update/:id", productsRouter )
app.use("/api/delete/:idProduct", productsRouter )

// use cartsRouter

app.use("/api/cart", cartsRouter )
app.use("/", cartsRouter)


const PORT = 8080;
app.listen(PORT,()=>{
    console.log('====================================');
    console.log("servidor activo en http://localhost:"+PORT);
    console.log('====================================');
})  