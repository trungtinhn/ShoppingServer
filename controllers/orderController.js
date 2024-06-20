const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Order'); // Adjust the path as needed
const Product = require('../models/Product'); // Adjust the path as needed
const Cart = require('../models/Cart'); // Adjust the path as needed
const Promotion = require('../models/Promotion');
const User = require('../models/User');
const orderController = {
    createOrder : async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { userId, products, promotionId } = req.body;

            console.log(userId);
            console.log(products);
            console.log(promotionId);
            
            // Tạo đơn hàng mới
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save({ session });

            // Cập nhật số lượng sản phẩm trong kho
            for (const item of products) {
                await Product.updateOne(
                    { _id: item.productId, 'Type.size': item.size, 'Type.color': item.color },
                    { $inc: { 'Type.$.quantity': -item.quantity } },
                    { session }
                );
            }

            // Cập nhật giỏ hàng: loại bỏ các sản phẩm đã đặt
            for (const item of products) {
                await Cart.updateOne(
                    { userId },
                    { $pull: { products: { productId: item.productId, size: item.size, color: item.color } } },
                    { session }
                );
            }

            // Cập nhật khuyến mãi: giảm số lượng
            if (promotionId) {
                await Promotion.updateOne(
                    { _id: promotionId },
                    { $inc: { SoLuotSuDung: 1, SoLuotConLai: -1 } },
                    { session }
                );
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json(savedOrder);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
    
            res.status(400).json({ message: error.message });
        }
    },
    getAllOrders : async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrderById : async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrdersByUserId : async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.params.userId });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrdersByUserIdAndStatus : async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.params.userId, status: req.params.status }).lean();

            const ordersWithUserDetails = await Promise.all(orders.map(async (order) => {
                const user = await User.findOne({ MaND: order.userId });
                if (user) {
                    order.TenND = user.TenND;
                    order.Avatar = user.Avatar;
                } else {
                    // Handle case where user is not found
                    order.TenND = 'Unknown';
                    order.Avatar = ''; // Provide a default image if necessary
                }
                return order;
            }));


            res.json(ordersWithUserDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateOrderById : async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateOrderStatus : async (req, res) => {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
    
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteOrderById : async (req, res) => {
        try {
            const deletedOrder = await Order.findByIdAndDelete(req.params.id);
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = orderController