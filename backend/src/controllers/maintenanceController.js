const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getMaintenanceRequests = async (req, res) => {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      include: { tenant: true, unit: { include: { property: true } } },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch maintenance requests', error: error.message });
  }
};

const getMaintenanceRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await prisma.maintenanceRequest.findUnique({
      where: { id },
      include: { tenant: true, unit: { include: { property: true } } },
    });
    if (!request) return res.status(404).json({ message: 'Maintenance request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch maintenance request', error: error.message });
  }
};

const createMaintenanceRequest = async (req, res) => {
  const { unitId, description, priority } = req.body;
  try {
    const request = await prisma.maintenanceRequest.create({
      data: {
        tenantId: req.user.id,
        unitId,
        description,
        priority: priority || 'medium',
      },
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create maintenance request', error: error.message });
  }
};

const updateMaintenanceRequest = async (req, res) => {
  const { id } = req.params;
  const { status, priority } = req.body;
  try {
    const request = await prisma.maintenanceRequest.update({
      where: { id },
      data: {
        status,
        priority,
      },
    });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update maintenance request', error: error.message });
  }
};

const deleteMaintenanceRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.maintenanceRequest.delete({ where: { id } });
    res.json({ message: 'Maintenance request deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete maintenance request', error: error.message });
  }
};

module.exports = {
  getMaintenanceRequests,
  getMaintenanceRequest,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
};