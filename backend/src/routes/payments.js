const express = require('express');
const { getPayments, getPayment, createPayment, updatePayment, deletePayment } = require('../controllers/paymentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER', 'LANDLORD'), getPayments);
router.get('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER', 'LANDLORD'), getPayment);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), createPayment);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), updatePayment);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), deletePayment);

module.exports = router;