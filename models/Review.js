const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    AnhDG: {
        type: [String],
    },
    MaND: {
        type: String,
        required: true
    },
    MaSP: {
        type: String,
        required: true
    },
    NDDG: {
        type: String,
        required: true
    },
    NgayDG: {
        type: Date,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
