const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getLeases = async (req, res) => {
  try {
    const leases = await prisma.lease.findMany({
      include: { tenant: { include: { user: true } }, unit: { include: { property: true } }, payments: true },
    });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leases', error: error.message });
  }
};

const getLease = async (req, res) => {
  const { id } = req.params;
  try {
    const lease = await prisma.lease.findUnique({
      where: { id },
      include: { tenant: { include: { user: true } }, unit: { include: { property: true } }, payments: true },
    });
    if (!lease) return res.status(404).json({ message: 'Lease not found' });
    res.json(lease);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lease', error: error.message });
  }
};

const createLease = async (req, res) => {
  const { tenantId, unitId, startDate, endDate, rentAmount, securityDeposit } = req.body;
  try {
    const lease = await prisma.lease.create({
      data: {
        tenantId,
        unitId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        rentAmount,
        securityDeposit,
      },
    });
    res.status(201).json(lease);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create lease', error: error.message });
  }
};

const updateLease = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, rentAmount, securityDeposit, status } = req.body;
  try {
    const lease = await prisma.lease.update({
      where: { id },
      data: {
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        rentAmount,
        securityDeposit,
        status,
      },
    });
    res.json(lease);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update lease', error: error.message });
  }
};

const deleteLease = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lease.delete({ where: { id } });
    res.json({ message: 'Lease deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete lease', error: error.message });
  }
};

module.exports = {
  getLeases,
  getLease,
  createLease,
  updateLease,
  deleteLease,
};