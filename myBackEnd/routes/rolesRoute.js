// userRoutes.js
const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

// Get all users
router.get('/', rolesController.getAllRoles);


module.exports = router;