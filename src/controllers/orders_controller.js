const { Order } = require('../models');

const createOrder = async (req, res) => {
    try {
        res.status(201).json({ message: 'Order created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllOrders = async (ctx) => {
    try {
        const orders = await Order.findAll({
            order: [['receivedAt', 'DESC']]
        });

        ctx.status = 200;
        ctx.body = orders;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
};

const getOrdersByHour = async (req, res) => {
    try {
        res.status(200).json({ message: 'Orders by hour' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getOrderData = async (req, res) => {
    try {
        res.status(200).json({ message: 'Order data' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const receiveProducts = async (req, res) => {
    try {
        res.status(200).json({ message: 'Order received' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createOrder, receiveProducts, getAllOrders, getOrdersByHour, getOrderData };