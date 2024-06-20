const Cart = require('../models/Cart'); // Adjust the path as necessary

const cartController = {
    addProductToCart: async (req, res) => {
        try {
            const { userId, productId, name, image, quantity, size, color, price } = req.body;
            const totalPrice = price * quantity;

            // Find the cart for the user
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                // Create a new cart if it doesn't exist
                cart = new Cart({ userId, products: [] });
            }

            // Check if the product with the same color and size is already in the cart
            const productIndex = cart.products.findIndex(product => 
                product.productId.toString() === productId &&
                product.color === color &&
                product.size === size
            );

            if (productIndex !== -1) {
                // Update quantity and total price if the product with the same color and size is already in the cart
                cart.products[productIndex].quantity += quantity;
                cart.products[productIndex].totalPrice += totalPrice;
            } else {
                // Add new product to cart
                cart.products.push({ productId, name, image, quantity, size, color, price, totalPrice });
            }

            // Save the updated cart
            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to add product to cart!', error });
        }
    },
    updateProductInCart: async (req, res) => {
        try {
            const { userId, productId, size, color, quantity, price } = req.body;
            const totalPrice = price * quantity;

            // Find the cart for the user
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            console.log(userId + " " + productId + " " + size + " " + color + " " + quantity + " " + price)

            // Find the product with the same color and size in the cart
            const productIndex = cart.products.findIndex(product => 
                product.productId.toString() === productId &&
                product.color === color &&
                product.size === size
            );

            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            // Update product quantity and total price
            const product = cart.products[productIndex];
            product.quantity = quantity;
            product.price = price;
            product.totalPrice = totalPrice;

            // Save the updated cart
            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update product in cart!', error });
        }
    },
    removeProductFromCart: async (req, res) => {
        try {
            const { userId, productId, size, color } = req.body;

            // Find the cart for the user
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Find the product with the same color and size in the cart
            const productIndex = cart.products.findIndex(product => 
                product.productId.toString() === productId &&
                product.color === color &&
                product.size === size
            );

            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            // Remove the product
            cart.products.splice(productIndex, 1);

            // Save the updated cart
            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to remove product from cart!', error });
        }
    },
    clearCart: async (req, res) => {
        try {
            const { userId } = req.body;

            // Find the cart for the user and remove all products
            const cart = await Cart.findOneAndUpdate({ userId }, { $set: { products: [], totalPrice: 0, numProducts: 0 } }, { new: true });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to clear cart!', error });
        }
    },
    getCart: async (req, res) => {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ userId }).populate('products.productId');

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get cart!', error });
        }
    }
};

module.exports = cartController;
