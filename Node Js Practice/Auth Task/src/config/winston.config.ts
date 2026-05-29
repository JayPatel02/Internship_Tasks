import winston from "winston";

const auditChecker = winston.format((info)=>{
  return info.action ? info : false
})

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp({ format: () => new Date().toISOString() }),
    winston.format.json() 
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), 
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ 
      filename: 'logs/audit.log', 
      format: winston.format.combine(
        auditChecker(), // Filter for audit logs
        winston.format.json()
      ) 
    }) // Only logs with "action" field
  ],
});

export default logger