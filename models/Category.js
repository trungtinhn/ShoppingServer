const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    numProduct: {
        type: Number,
        default: 0,
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema)
