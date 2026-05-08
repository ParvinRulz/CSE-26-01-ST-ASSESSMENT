const mongoose = require('mongoose');
const tableData = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
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
   
});

module.exports = mongoose.model("TableData", tableData);