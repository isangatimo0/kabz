const express = require('express');
const { getMaintenanceRequests, getMaintenanceRequest, createMaintenanceRequest, updateMaintenanceRequest, deleteMaintenanceRequest } = require('../controllers/maintenanceController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), getMaintenanceRequests);
router.get('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER', 'TENANT'), getMaintenanceRequest);
router.post('/', authenticateToken, authorizeRoles('TENANT'), createMaintenanceRequest);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), updateMaintenanceRequest);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'PROPERTY_MANAGER'), deleteMaintenanceRequest);

module.exports = router;