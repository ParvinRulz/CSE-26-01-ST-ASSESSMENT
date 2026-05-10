const mongoose = require('mongoose');
const dashboardForm = new mongoose.Schema({
    productName: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: String,
    },
    color: {
        type: String,
    },
    productImage: {
        type: String,
    },
    productId: {
        type: String,
        unique: true,
        default: () => {
            return "#" + Math.floor(100000 + Math.random() * 900000);
        },

    }
});

module.exports = mongoose.model("DashboardForm", dashboardForm);