const getItemStock = async (req, res) => {
    try {
        res.status(200).json({ message: 'Item stock' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getExpiringItems = async (req, res) => {
    try {
        res.status(200).json({ message: 'Expiring items' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAvailableStorage = async (req, res) => {
    try {
        res.status(200).json({ message: 'Available storage' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getItemStock, getExpiringItems, getAvailableStorage };