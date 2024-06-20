const mongoose = require('mongoose');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const TypeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ProductSchema = new mongoose.Schema({
    GiaGoc: {
        type: Number,
        required: true
    },
    GiaGiam:{
        type: Number,
        default: 0
    },
    HinhAnhSP: {
        type: [String], // Array of strings for image URLs or paths
        required: true
    },
    MaDM: {
        type: String,
        required: true
    },
    MauSac: {
        type: [ColorSchema],
        required: true
    },
    Size: {
        type: [String],
        required: true
    },
    Type: {
        type: [TypeSchema],
        required: true
    },
    SoLuotDanhGia: {
        type: Number,
        default: 0
    },
    Rating: {
        type: Number,
        default: 0
    },
    SoLuongDaBan: {
        type: Number,
        default: 0
    },
    SoLuongSP: {
        type: Number,
        required: true
    },
    SoLuotXem: {
        type: Number,
        default: 0
    },
    SoLuotYeuThich: {
        type: Number,
        default: 0
    },
    TenSP: {
        type: String,
        required: true
    },
    TrangThai: {
        type: String,
        enum: ['available', 'outofstock', 'onwait'],
        required: true
    },
    Trending: {
        type: Boolean,
        default: false
    },
    Onsale: {
        type: Boolean,
        default: true
    },
    TiLeKM: {
        type: Number,
        default: 0
    },
    MoTaSP: {
        type: String,
        default: "Không có mô tả cho sản phẩm này",
        required: true
    }
}, { timestamps: true });

// Tạo các đặc trưng từ giá gốc, giá giảm và tên sản phẩm
ProductSchema.virtual('features').get(function() {
    const priceFeature = this.GiaGoc;
    const discountPriceFeature = this.GiaGiam;
    
    // Tạo mảng các giá trị TF-IDF
    const tfidfValues = [];
    tfidf.addDocument(this.TenSP);
    tfidf.tfidfs(this.TenSP, function(i, measure) {
        tfidfValues.push(measure);
    });

    // Chuyển đổi tfidfValues thành mảng 1 chiều
    const flattenedTfidfValues = [].concat(...tfidfValues);

    return [priceFeature, discountPriceFeature, ...flattenedTfidfValues];
  });



module.exports = mongoose.model('Product', ProductSchema);
