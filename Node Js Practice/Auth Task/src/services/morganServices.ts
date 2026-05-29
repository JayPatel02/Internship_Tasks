import morgan from "morgan";
import logger from "../config/winston.config";
import { type Request } from "express";

const morganMiddleware = morgan(
    ':method :url :status :res[content-length]  :response-time ms',
    {   
        skip: (req : Request) => {
            const url = req.originalUrl || req.url
            return url.includes('/JS/') || url.includes('/favicon.ico') || url.includes('.map') || url.includes('/css/') 
        },
        stream: {
            write: (message) => logger.info(message.trim()),
        },
        
    }
)

export default morganMiddleware