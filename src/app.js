import  express  from "express";
import productsRouter from "./routes/productsRouter.js"



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// use router
app.use("/", productsRouter)
app.use("/api/idproduct", productsRouter ) 
app.use("/api/products/:idProduct", productsRouter )
app.use("/", productsRouter )
app.use("/api/put/:id", productsRouter )
app.use("/api/delete/:idProduct", productsRouter )

const PORT = 8080;
app.listen(PORT,()=>{
    console.log('====================================');
    console.log("servidor activo en http://localhost:"+PORT);
    console.log('====================================');
})  