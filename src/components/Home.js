import React from "react";
import axios from "axios";
import { useState } from "react";
import List from "./List";

export const Home = () => {
  const [stuname, setStuname] = useState("");
  const [email, setEmail] = useState("");
  const [filename, setFilename] = useState("");
  const [status, setStatus] = useState();

  // add data
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!stuname || !email || filename === "") {
        if (!stuname) {
          alert("fill stuname field");
        }
        if (!email) {
          alert("fill email field");
        }
        if (!filename) {
          alert("fill image field");
        }
      } else {
        const formData = new FormData();

        formData.append("stuname", stuname);
        formData.append("email", email);
        formData.append("myfile", filename, filename.name);

        await axios.post("http://localhost:8000/api/student", formData);

        setStuname("");
        setEmail("");
        setFilename("");
        setStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (status) {
    return <Home />;
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 mt-5">
            <form
              action=""
              onSubmit={handleSubmit}
              className="border shadow p-3 me-2 d-grid"
              encType="multipart/form-data"
            >
              <h2 className="alert alert-success text-center shadow shadow-lg">
                Add New Student
              </h2>
              <div className="mb-3">
                <label htmlFor="stuname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="stuname"
                  id="stuname"
                  value={stuname}
                  onChange={(e) => {
                    setStuname(e.target.value);
                  }}
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setFilename(e.target.files[0]);
                  }}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary my-5 rounded-pill shadow shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-sm-8 mt-5 border shadow p-3">
            <h2 className="alert alert-success text-center shadow shadow-lg">
              STUDENT LIST
            </h2>
            <List />
          </div>
        </div>
      </div>
    </>
  );
};
