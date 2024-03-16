import  express  from "express";
import productsRouter from "./routes/productsRouter.js"



const app = express()
app.use(express.json)
app.use(express.urlencoded({extended:true}));

// use router
app.get("/api/products",productsRouter)
app.get("/api/product", productsRouter ) 
app.get("/api/products/:idProduct", productsRouter )
app.post("/", productsRouter )

const PORT = 8080;
app.listen(PORT,()=>{
    console.log('====================================');
    console.log("servidor activo en http://localhost:"+PORT);
    console.log('====================================');
})  