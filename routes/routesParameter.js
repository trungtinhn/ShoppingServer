const express = require('express');
const router = express.Router();
const parameterController = require('../controllers/parameterController');

// Route để lấy thông tin của bảng tham số
router.get('/get' , parameterController.getParameter);

// Route để cập nhật thông tin của bảng tham số
router.put('/update', parameterController.updateParameter);

module.exports = router;
