const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: req.user.role === 'LANDLORD' ? { landlordId: req.user.id } : req.user.role === 'PROPERTY_MANAGER' ? { managerId: req.user.id } : {},
      include: { units: true },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
  }
};

const getProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: { units: true },
    });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch property', error: error.message });
  }
};

const createProperty = async (req, res) => {
  const { name, address, city, state, zipCode, managerId } = req.body;
  try {
    const property = await prisma.property.create({
      data: {
        name,
        address,
        city,
        state,
        zipCode,
        landlordId: req.user.id,
        managerId,
      },
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create property', error: error.message });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { name, address, city, state, zipCode, managerId } = req.body;
  try {
    const property = await prisma.property.update({
      where: { id },
      data: {
        name,
        address,
        city,
        state,
        zipCode,
        managerId,
      },
    });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update property', error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.property.delete({ where: { id } });
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete property', error: error.message });
  }
};

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};