const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [ProductSchema]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
