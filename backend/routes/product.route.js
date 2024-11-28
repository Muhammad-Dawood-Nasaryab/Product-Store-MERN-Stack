import express from "express";
import { 
   getProducts, 
   createProduct, 
   updateProduct, 
   deleteProduct 
} from "../controllers/product.controller.js";

/* `const router = express.Router();` is creating a new router object using the `express.Router()`
method provided by the Express framework. This router object is used to define routes for handling
different HTTP requests such as GET, POST, PUT, and DELETE. Each route is then attached to this
router object to specify the corresponding controller function that should be executed when that
route is accessed. Finally, the router object is exported to be used in the main application file to
set up the routing for the Node.js application. */
const router = express.Router();

/* These lines of code are setting up routes for handling HTTP requests in a Node.js application using
Express framework. */
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;