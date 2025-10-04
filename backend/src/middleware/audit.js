const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const auditLog = async (req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    if (req.user && res.statusCode < 400) { // Log successful actions
      prisma.auditLog.create({
        data: {
          userId: req.user.id,
          action: req.method + ' ' + req.originalUrl,
          entity: req.baseUrl.split('/').pop() || 'unknown',
          entityId: req.params.id || null,
          details: JSON.stringify({ body: req.body, query: req.query }),
        },
      }).catch(console.error);
    }
    originalSend.call(this, data);
  };
  next();
};

module.exports = auditLog;