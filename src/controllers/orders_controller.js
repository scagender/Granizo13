const createOrder = async (req, res) => {
    try {
        res.status(201).json({ message: 'Order created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createOrder };