import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "coverPhoto") {
            cb(null, "uploads/coverPhotos");
        } else if (file.fieldname === "avatarPhoto") {
            cb(null, "uploads/avatarPhotos");
        } else if (file.fieldname === "tweetImg") {
            cb(null, "uploads/tweetImages");
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext: string = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    },
})

const filter = (req: any, file: any, cb: any) => {
    const allowedExtensions = /jpeg|jpg|png|gif|webp/;
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedExtensions.test(ext)) {
        cb(null, true);
    }else{

        cb(new Error("Only Images and GIFs are allowed!"));
    }
}

export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter : filter
});
