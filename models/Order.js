const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    promotionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotion',
    },
    products: [{
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
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }],
    discount: {
        type: Number,
        required: true,
    },
    deliveryFees: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalProduct:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirm', 'On Wait', 'Delivering', 'Delivered', 'Cancel'],
        default: 'Confirm'
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
