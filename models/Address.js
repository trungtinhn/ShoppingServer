const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    DiaChi: {
        type: String,
        required: true
    },
    MaND: {
        type: String,
        required: true
    },
    PhuongXa: {
        type: String,
        required: true
    },
    QuanHuyen: {
        type: String,
        required: true
    },
    SDT: {
        type: String,
        required: true
    },
    TenNguoiMua: {
        type: String,
        required: true
    },
    TinhThanhPho: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
