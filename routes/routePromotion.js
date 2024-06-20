const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addPromotion', verifyToken ,promotionController.addPromotion);
router.get('/getAllPromotions', verifyToken ,promotionController.getAllPromotions);
router.get('/getPromotionById/id=:id', verifyToken, promotionController.getPromotionById);
router.put('/updatePromotion/id=:id', verifyToken ,promotionController.updatePromotion);
router.delete('/deletePromotion/id=:id', verifyToken ,promotionController.deletePromotion);
router.get('/getPromotionCurrent', verifyToken ,promotionController.getPromotionCurrent);
router.get('/checkPromotion/id=:id', verifyToken ,promotionController.checkPromotion);
module.exports = router;
