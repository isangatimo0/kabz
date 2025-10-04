const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password, role, firstName, lastName, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        phone,
      },
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });
  try {
    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: 'User not found' });
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // TODO: Generate reset token, send email
  res.json({ message: 'Password reset email sent' });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // TODO: Verify token, update password
  res.json({ message: 'Password reset successfully' });
};

module.exports = {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
};