const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addLike', verifyToken, likeController.addLike);
router.put('/checkLike', verifyToken, likeController.checkLike);
router.delete('/deleteLike', verifyToken, likeController.deleteLike);
router.get('/getLikeByUser/MaND=:MaND', verifyToken, likeController.getLikeByUser);
module.exports = router