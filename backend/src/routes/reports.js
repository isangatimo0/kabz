const express = require('express');
const { getRentRoll, getIncomeVsExpenses, getOutstandingPayments } = require('../controllers/reportsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/rent-roll', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD', 'PROPERTY_MANAGER'), getRentRoll);
router.get('/income-expenses', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD'), getIncomeVsExpenses);
router.get('/outstanding-payments', authenticateToken, authorizeRoles('ADMIN', 'LANDLORD', 'PROPERTY_MANAGER'), getOutstandingPayments);

module.exports = router;