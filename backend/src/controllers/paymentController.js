const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { lease: { include: { tenant: { include: { user: true } }, unit: true } } },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};

const getPayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { lease: { include: { tenant: { include: { user: true } }, unit: true } } },
    });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment', error: error.message });
  }
};

const createPayment = async (req, res) => {
  const { leaseId, amount, dueDate, paidDate, lateFee } = req.body;
  try {
    const payment = await prisma.payment.create({
      data: {
        leaseId,
        amount,
        dueDate: new Date(dueDate),
        paidDate: paidDate ? new Date(paidDate) : null,
        lateFee: lateFee || 0,
      },
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create payment', error: error.message });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, dueDate, paidDate, status, lateFee } = req.body;
  try {
    const payment = await prisma.payment.update({
      where: { id },
      data: {
        amount,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        paidDate: paidDate ? new Date(paidDate) : null,
        status,
        lateFee,
      },
    });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update payment', error: error.message });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.payment.delete({ where: { id } });
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete payment', error: error.message });
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};