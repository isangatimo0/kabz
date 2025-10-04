const express = require('express');
const { getLeases, getLease, createLease, updateLease, deleteLease } = require('../controllers/leaseController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER', 'LANDLORD'), getLeases);
router.get('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER', 'LANDLORD'), getLease);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), createLease);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), updateLease);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), deleteLease);

module.exports = router;