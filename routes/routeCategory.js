const categoryController = require('../controllers/categoryController')

const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')

router.post('/addCategory', verifyToken , categoryController.addCategory)
router.put('/id=:id', verifyToken ,categoryController.updateCategory),
router.delete('/id=:id', verifyToken , categoryController.deleteCategory),
router.get('/getCategory', verifyToken ,categoryController.getCategory),
router.put('/updateProductAmount/:id', verifyToken ,categoryController.updateProductAmountInCategory),

module.exports = router