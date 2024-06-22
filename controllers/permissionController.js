// controllers/PermissionController.js
const Permission = require('../models/Permission');

// Lấy bảng phân quyền
const PermissionController = {
  getPermissions: async (req, res) => {
    try {
      const permissions = await Permission.findOne();
      if (!permissions) {
        return res.status(404).json({message: 'Permissions not found'});
      }
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  // Cập nhật bảng phân quyền
  updatePermissions: async (req, res) => {
    try {
      const {category, promotion, product, order, user} = req.body;
      const permissions = await Permission.findOne();
      if (!permissions) {
        return res.status(404).json({message: 'Permissions not found'});
      }

      permissions.category =
        category !== undefined ? category : permissions.category;
      permissions.promotion =
        promotion !== undefined ? promotion : permissions.promotion;
      permissions.product =
        product !== undefined ? product : permissions.product;
      permissions.order = order !== undefined ? order : permissions.order;
      permissions.user = user !== undefined ? user : permissions.user;

      await permissions.save();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },
};
module.exports = PermissionController