const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addAddress', verifyToken ,addressController.addAddress);
router.put('/updateAddress/id=:id', verifyToken ,addressController.updateAddress);
router.delete('/deleteAddress/id=:id', verifyToken ,addressController.deleteAddress);
router.get('/getAddresses', verifyToken ,addressController.getAllAddresses);
router.get('/getAddress/id=:id', verifyToken ,addressController.getAddressById);
router.get('/getAddressByMaND/MaND=:MaND', verifyToken ,addressController.getAddressByMaND);
module.exports = router;
