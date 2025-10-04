const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getTenants = async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany({
      include: { user: true, leases: { include: { unit: true } } },
    });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tenants', error: error.message });
  }
};

const getTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id },
      include: { user: true, leases: { include: { unit: true } } },
    });
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tenant', error: error.message });
  }
};

const createTenant = async (req, res) => {
  const { userId, ssn, dob, emergencyContact } = req.body;
  try {
    const tenant = await prisma.tenant.create({
      data: {
        userId,
        ssn,
        dob: dob ? new Date(dob) : null,
        emergencyContact,
      },
    });
    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create tenant', error: error.message });
  }
};

const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { ssn, dob, emergencyContact } = req.body;
  try {
    const tenant = await prisma.tenant.update({
      where: { id },
      data: {
        ssn,
        dob: dob ? new Date(dob) : null,
        emergencyContact,
      },
    });
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update tenant', error: error.message });
  }
};

const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tenant.delete({ where: { id } });
    res.json({ message: 'Tenant deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete tenant', error: error.message });
  }
};

module.exports = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};