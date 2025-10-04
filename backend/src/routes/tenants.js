const express = require('express');
const { getTenants, getTenant, createTenant, updateTenant, deleteTenant } = require('../controllers/tenantController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), getTenants);
router.get('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), getTenant);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), createTenant);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), updateTenant);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), deleteTenant);

module.exports = router;