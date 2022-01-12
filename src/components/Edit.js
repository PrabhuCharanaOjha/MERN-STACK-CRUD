import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";

export const Edit = () => {
  const { id } = useParams();

  const [students, setStudents] = useState({
    stuname: "",
    email: "",
    uploadimage: "",
  });

  // get data for edit
  useEffect(() => {
    async function getStudent() {
      try {
        const students = await axios.get(
          `http://localhost:8000/api/student/edit/${id}`
        );
        console.log(students.data);
        setStudents(students.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStudent();
  }, [id]);

  // catch text data from form...
  function ontextFieldChange(e) {
    setStudents({
      ...students,
      [e.target.name]: e.target.value,
    });
  }
  // catch image data from form...
  function onFileFieldChange(e) {
    setStudents({
      ...students,
      uploadimage: e.target.files[0],
    });
  }

  // update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!students.stuname || !students.email || !students.myfile) {
      if (!students.stuname) {
        alert("fill stuname field");
      }
      if (!students.email) {
        alert("fill email field");
      }
      if (!students.myfile) {
        alert("fill image field");
      }
    } else {
      const formData = new FormData();

      formData.append("stuname", students.stuname);
      formData.append("email", students.email);
      formData.append(
        "myfile",
        students.uploadimage,
        students.uploadimage.name
      );

      await axios.post(
        `http://localhost:8000/api/student/update/${id}`,
        formData
      );
      window.location = "/";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5 offset-sm-3">
          <form
            action=""
            onSubmit={handleSubmit}
            className="border shadow p-3 me-2 d-grid"
            encType="multipart/form-data"
          >
            <h2 className="alert alert-success text-center shadow shadow-lg">
              Update Student
            </h2>
            <div className="mb-3">
              <label htmlFor="stuname" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="stuname"
                id="stuname"
                value={students.stuname}
                onChange={(e) => ontextFieldChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={students.email}
                onChange={(e) => ontextFieldChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                name="myfile"
                onChange={(e) => onFileFieldChange(e)}
                className="form-control"
              />
            </div>
            <div class="form-row">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-2 rounded-pill shadow shadow-lg"
                >
                  Submit
                </button>
              </div>
              <div className="col">
                <Link
                  to="/"
                  className="btn btn-warning form-control mt-2 rounded-pill shadow shadow-lg"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
