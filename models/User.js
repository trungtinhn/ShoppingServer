const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    TenND: { type: String, required: true },
    Email: { type: String, unique: true },
    Phone: { type: String},
    NgaySinh: { type: Date},
    MaND: { type: String, required: true, unique: true },
    LoaiND: { type: String, required: true },
    Avatar: { type: String },
    DiaChi: { type: String },
    GioiTinh: {type: String, default: ""}
});

module.exports = mongoose.model("User", UserSchema)