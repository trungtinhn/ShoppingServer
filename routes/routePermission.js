// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissionController');

router.get('/getPermissions', PermissionController.getPermissions);
router.put('/setPermissions', PermissionController.updatePermissions);

module.exports = router;
