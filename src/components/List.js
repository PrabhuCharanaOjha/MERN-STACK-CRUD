import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [students, setStudents] = useState([]);

  var i = 1;

  // get all data
  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get("http://localhost:8000/api/student");
        console.log(students.data);
        setStudents(students.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudent();
  }, []);

  // delete data
  const handleDelete = async (id) => {
    await axios.post(`http://localhost:8000/api/student/delete/${id}`);
  };

  return (
    <table className="table table-striped table hover text-center">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => {
          return (
            <tr key={index}>
              <td>{i++}</td>
              <td>{student.stuname}</td>
              <td>{student.email}</td>
              <td>
                <img
                  src={`http://localhost:8000/public/image/${student.uploadimage}`}
                  alt={student.uploadimage}
                  height="80"
                  width="80"
                />
              </td>
              <td>
                <form action="" className="d-inline">
                  <Link to={`/edit/${student._id}`} className="btn">
                    <i className="fas fa-pen-square text-info"></i>
                  </Link>
                </form>
                <form action="" className="d-inline">
                  <button
                    type="submit"
                    onClick={() => {
                      handleDelete(student._id);
                    }}
                  >
                    <i className="fas fa-trash text-danger"></i>
                  </button>
                </form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
