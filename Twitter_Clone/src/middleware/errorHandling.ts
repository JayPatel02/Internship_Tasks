import multer from "multer"
import type { Request, Response, NextFunction } from "express";

const errorHandler = ((err: { code: string; message: any; }, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: 'File size is too large. Max limit is 5MB.'
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message })
  };
  res.status(500).json({message : "Internal Server Error"})

});

export default errorHandler