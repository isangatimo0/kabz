const express = require('express');
const { getProperties, getProperty, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD', 'PROPERTY_MANAGER'), getProperties);
router.get('/:id', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD', 'PROPERTY_MANAGER'), getProperty);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD'), createProperty);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD'), updateProperty);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD'), deleteProperty);

module.exports = router;