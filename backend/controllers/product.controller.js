import mongoose from "mongoose";
import Product from "../models/product.model.js";

/**
 * The function `getProducts` fetches all products from the database and returns them as a JSON
 * response, handling errors appropriately.
 * @param req - The `req` parameter in the `getProducts` function typically represents the HTTP request
 * object, which contains information about the incoming request from the client, such as headers,
 * parameters, body content, and more. It is commonly used to access data sent by the client to the
 * server. In this context
 * @param res - The `res` parameter in the `getProducts` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to set the
 * status code, send data back in the response body, and handle errors by sending error responses.
 */
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	};
};

/**
 * The function `createProduct` handles the creation of a new product by validating input data, saving
 * the product to the database, and returning a response with success status and data.
 * @param req - `req` is the request object representing the HTTP request made by the client to the
 * server. It contains information about the request such as headers, parameters, body, and more. In
 * this context, `req.body` is the data sent by the user in the request body.
 * @param res - The `res` parameter in the `createProduct` function is the response object that will be
 * used to send a response back to the client who made the request. It is typically used to set the
 * status code of the response (e.g., 200 for success, 400 for bad request,
 * @returns If all required fields (name, price, image) are provided in the request body, a new product
 * will be created and saved to the database. If successful, a response with status code 201 and a JSON
 * object containing the newly created product data will be returned. If there is an error during the
 * process, an error message will be logged to the console and a response with status code 500
 */
export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	};

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	};
};

/**
 * The function `updateProduct` updates a product in a database based on the provided ID and returns
 * the updated product data.
 * @param req - The `req` parameter in the `updateProduct` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this context, `req.params` is used to access parameters in the URL of
 * the
 * @param res - The `res` parameter in the `updateProduct` function is the response object that is used
 * to send a response back to the client making the request. It is typically used to set the status
 * code and send data or messages back to the client.
 * @returns The `updateProduct` function is returning a JSON response based on the outcome of the
 * update operation. If the product ID is invalid, it returns a 404 status with a message indicating
 * the invalid ID. If the update operation is successful, it returns a 200 status with the updated
 * product data. If there is a server error during the update operation, it returns a 500 status with a
 * generic
 */
export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

/**
 * The `deleteProduct` function deletes a product by its ID and returns a success message if the
 * deletion is successful.
 * @param req - The `req` parameter in the `deleteProduct` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as the request
 * headers, parameters, body, and other details sent by the client to the server. In this case,
 * `req.params` is
 * @param res - The `res` parameter in the `deleteProduct` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to set the
 * status code and send JSON data in response to the request.
 * @returns If the product with the specified ID is successfully deleted, a JSON response with status
 * code 200 and the message "Product deleted" is returned. If the ID is invalid, a JSON response with
 * status code 404 and the message "Invalid Product Id" is returned. If there is an error during the
 * deletion process, a JSON response with status code 500 and the message "Server Error" is
 */
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

