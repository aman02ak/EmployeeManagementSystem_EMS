import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./Post.css";

function Post() {
  let { empId } = useParams();
  const [empList, setEmpList] = useState([]);
  // empList.dob = new Date(empList.dob);
  // console.log(empList.hiredate);
  // empList.hiredate = new Date(empList.hiredate);

  // console.log(empList.hiredate);
  // console.log(
  //   empList.dob.getDate(),
  //   empList.dob.getMonth(),
  //   empList.dob.getFullYear()
  // );
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/getFromId/${empId}`).then((data) => {
      setEmpList(data.data[0]);
    });
  }, [empId]);

  return (
    <div className="EmpIndividualContainer">
      <div className="EmpIndividual">
        <div className="EmpIndividualContent">
          <h3>
            {empList.fname} {empList.lname}
          </h3>
          {empList.length !== 0 ? (
            <div className="section">
              <p>Employee Id : {empList.empid}</p>
              <p>
                Date Of Birth: {empList.dob.slice(8, 10)}/
                {empList.dob.slice(5, 7)}/{empList.dob.slice(0, 4)}
              </p>
              <p>
                Gender: {empList.gender === "M" ? "Male" : ""}
                {empList.gender === "F" ? "Female" : ""}
                {empList.gender === "O" ? "Others" : ""}
                {empList.gender === "N" ? "Not Available" : ""}
              </p>
              <p>
                Hire Date: {empList.hiredate.slice(8, 10)}/
                {empList.hiredate.slice(5, 7)}/{empList.hiredate.slice(0, 4)}
              </p>
            </div>
          ) : null}
          <div className="article">
            <img
              alt="person"
              src={
                empList.picturepath && empList.picturepath.length !== 0
                  ? empList.picturepath
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
