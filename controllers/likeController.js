const Like = require('../models/Like');

const likeController = {
    addLike: async (req, res) => {
        const { MaND, _id } = req.body;
        try {
            let yeuThich = await Like.findOne({ MaND });
            
            if (!yeuThich) {
                yeuThich = new Like({ MaND, danhSachSanPham: [] });
            }

            // Check if the product already exists in the favorites list
            if (yeuThich.danhSachSanPham.includes(_id)) {
                return res.status(400).json({ message: 'Sản phẩm đã được yêu thích' });
            }

            yeuThich.danhSachSanPham.push(_id);
            await yeuThich.save();
            
            res.status(200).json({ message: 'Đã thêm sản phẩm vào danh sách yêu thích' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm vào danh sách yêu thích' });
        }
    },
    deleteLike: async (req, res) => {
        const { MaND, _id } = req.body; 
        try {
            const yeuThich = await Like.findOne({ MaND });

            if (!yeuThich) {
                return res.status(404).json({ message: 'Không tìm thấy danh sách yêu thích của người dùng' });
            }

            yeuThich.danhSachSanPham = yeuThich.danhSachSanPham.filter(id => id.toString() !== _id);
            await yeuThich.save();

            res.status(200).json({ message: 'Đã xóa sản phẩm khỏi danh sách yêu thích' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm khỏi danh sách yêu thích' });
        }
    },
    checkLike: async (req, res) => {
        const { MaND, _id } = req.body; 
        try {
            console.log(MaND);
            const yeuThich = await Like.findOne({ MaND });

            if (!yeuThich) {
                return res.status(404).json({ message: 'Không tìm thấy danh sách yêu thích của người dùng' });
            }
            const isFavorited = yeuThich.danhSachSanPham.includes(_id);
            res.status(200).json({ isFavorited });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi kiểm tra sản phẩm trong danh sách yêu thích' });
        }
    },
    getLikeByUser: async (req, res) => {
        const { MaND } = req.params;
        try {
            const yeuThich = await Like.findOne({ MaND }).populate('danhSachSanPham');

            if (!yeuThich) {
                return res.status(404).json({ message: 'Không tìm thấy danh sách yêu thích của người dùng' });
            }
            res.status(200).json({ danhSachSanPham: yeuThich.danhSachSanPham });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm yêu thích' });
        }
    }
};

module.exports = likeController;
