import mongoose from "mongoose";

/* This code snippet is defining a Mongoose schema for a product in a MongoDB database. */
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
      required: true,
   }
}, {
   timestamps: true, // created at, updated at
});

const Product = mongoose.model("Product", productSchema);

export default Product;