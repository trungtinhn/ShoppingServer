const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userController.registerEmailPassword);
router.get('/MaND=:MaND', verifyToken, userController.getUserTypeByMaND);
router.put('/MaND=:MaND', verifyToken, userController.updateUser);
router.delete('/MaND=:MaND', verifyToken, userController.deleteUser);
router.get('/getUser/MaND=:MaND', verifyToken, userController.getCurrentUserData);
router.get('/users', verifyToken, userController.getAllUsers);

module.exports = router;