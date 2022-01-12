import StudentModel from "../models/student.js";
import fs from "fs";

class StudentController {
  // insert data
  static createDoc = async (req, res) => {
    try {
      const doc = new StudentModel({
        stuname: req.body.stuname,
        email: req.body.email,
        uploadimage: req.file ? req.file.filename : null,
      });

      // saving document
      const result = await doc.save();
      res.redirect("/api/student");
    } catch (error) {
      console.log(error);
    }
  };
  // getalldata
  static getAllDoc = async (req, res) => {
    try {
      const result = await StudentModel.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  // get one data for edit
  static editDoc = async (req, res) => {
    try {
      const result = await StudentModel.findById(req.params.id);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };
  // update your data
  static updateDoc = async (req, res) => {
    try {
      const deletefile = await StudentModel.findById(req.params.id);
      const path = `public/image/${deletefile.uploadimage}`;
      fs.unlinkSync(path);

      const result = await StudentModel.findByIdAndUpdate(req.params.id, {
        stuname: req.body.stuname,
        email: req.body.email,
        uploadimage: req.file ? req.file.filename : null,
      });
      res.redirect("/api/student");
    } catch (error) {
      console.log(error);
    }
  };
  // delete data
  static deleteDoc = async (req, res) => {
    try {
      const deletefile = await StudentModel.findById(req.params.id);
      const path = `public/image/${deletefile.uploadimage}`;
      fs.unlinkSync(path);
      const result = await StudentModel.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

export default StudentController;
