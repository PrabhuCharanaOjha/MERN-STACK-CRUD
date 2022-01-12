import express from "express";
import StudentController from "../controllers/studentController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/image");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/student", StudentController.getAllDoc);
router.post("/student", upload.single("myfile"), StudentController.createDoc);
router.post("/student/delete/:id", StudentController.deleteDoc);
router.get("/student/edit/:id", StudentController.editDoc);
router.post("/student/update/:id",upload.single("myfile"), StudentController.updateDoc);

export default router;
