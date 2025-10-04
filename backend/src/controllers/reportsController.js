const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRentRoll = async (req, res) => {
  try {
    const leases = await prisma.lease.findMany({
      include: { payments: true, tenant: { include: { user: true } }, unit: { include: { property: true } } },
    });
    const rentRoll = leases.map(lease => ({
      tenant: lease.tenant.user.firstName + ' ' + lease.tenant.user.lastName,
      unit: lease.unit.unitNumber,
      property: lease.unit.property.name,
      rentAmount: lease.rentAmount,
      paid: lease.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      outstanding: lease.payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    }));
    res.json(rentRoll);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate rent roll', error: error.message });
  }
};

const getIncomeVsExpenses = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: 'paid' },
    });
    const income = payments.reduce((sum, p) => sum + p.amount, 0);
    // For expenses, perhaps add an expenses table, but for now, placeholder
    const expenses = 0; // TODO: Add expenses tracking
    res.json({ income, expenses, net: income - expenses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate income vs expenses', error: error.message });
  }
};

const getOutstandingPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: 'pending' },
      include: { lease: { include: { tenant: { include: { user: true } }, unit: true } } },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch outstanding payments', error: error.message });
  }
};

module.exports = {
  getRentRoll,
  getIncomeVsExpenses,
  getOutstandingPayments,
};