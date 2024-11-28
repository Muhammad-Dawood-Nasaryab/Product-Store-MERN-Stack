import productRouter from "./routes/product.route.js";
import { connectDB } from "./config/db.js";
import express from "express";

const PORT = process.env.PORT;

/* The code `const app = express();` creates an instance of the Express application, which is the main
component of an Express server. This instance is used to define routes, middleware, and handle HTTP
requests. */
const app = express();
app.use(express.json());


/* `app.use("/api/products", productRouter);` is setting up a route in the Express application. This
route specifies that any incoming requests to the path "/api/products" should be handled by the
`productRouter` middleware. This means that any requests to routes under "/api/products" will be
processed by the routes defined in the `productRouter` module. */
app.use("/api/products", productRouter);


/* The `app.listen(5000, () => { ... })` function in the provided code snippet is starting a server
that listens for incoming HTTP requests on port 5000. When a request is received on port 5000, the
server will execute the callback function specified inside `app.listen`. */
app.listen(PORT, () => {
   connectDB();
   console.log(`Server is running at http://localhost:${PORT}`);
});
