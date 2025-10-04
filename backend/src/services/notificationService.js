const nodemailer = require('nodemailer');

// Configure transporter (use environment variables)
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent to', to);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

const sendSMS = async (to, message) => {
  // Placeholder for SMS, e.g., using Twilio
  console.log('SMS sent to', to, ':', message);
  // const twilio = require('twilio');
  // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  // await client.messages.create({ body: message, from: process.env.TWILIO_NUMBER, to });
};

const sendRentDueNotification = async (tenantEmail, amount, dueDate) => {
  const subject = 'Rent Due Reminder';
  const text = `Your rent of $${amount} is due on ${dueDate}. Please pay on time.`;
  await sendEmail(tenantEmail, subject, text);
};

const sendLeaseExpiringNotification = async (tenantEmail, endDate) => {
  const subject = 'Lease Expiring Soon';
  const text = `Your lease expires on ${endDate}. Please contact us to renew.`;
  await sendEmail(tenantEmail, subject, text);
};

const sendMaintenanceUpdateNotification = async (tenantEmail, status) => {
  const subject = 'Maintenance Request Update';
  const text = `Your maintenance request status has been updated to: ${status}.`;
  await sendEmail(tenantEmail, subject, text);
};

module.exports = {
  sendRentDueNotification,
  sendLeaseExpiringNotification,
  sendMaintenanceUpdateNotification,
};