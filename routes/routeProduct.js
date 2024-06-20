const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addProduct', verifyToken , productController.addProduct);
router.put('/updateProducts/id=:id', verifyToken ,productController.updateProduct);
router.delete('/deleteProducts/id=:id', verifyToken ,productController.deleteProduct);
router.get('/getProducts', verifyToken ,productController.getAllProducts);
router.get('/getProduct/id=:id', verifyToken ,productController.getProductById);
router.get('/getProductTrending', verifyToken ,productController.getProductTrending);
router.get('/getProductOnsale', verifyToken ,productController.getProductOnsale);
router.get('/getProductByCategory/MaDM=:MaDM', verifyToken ,productController.getProductByCategory);
router.get('/getProductAvailable', verifyToken ,productController.getProductAvailable);
router.get('/getProductOnwait', verifyToken ,productController.getProductOnwait);
router.get('/getProductOutofstock', verifyToken ,productController.getProductOutofstock);
router.put('/setProductStatus/status/:id',verifyToken, productController.setProductStatus);
router.put('/checkAvailable', verifyToken ,productController.checkAvailable);
module.exports = router;
