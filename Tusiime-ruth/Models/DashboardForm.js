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
    }
});

module.exports = mongoose.model("DashboardForm", dashboardForm);