import React, { useState } from "react";
import Axios from "axios";
import { useFormik } from "formik";
import "./CreatePost.css";
import errorImage from "./404.jpg";

// const handleReset = (resetForm) => {
//   if (window.confirm("Reset?")) {
//     resetForm();
//   }
// };

const validateEmployee = (empData) => {
  const errors = {};
  var special_charecter = `/[!@#$%^&*()_+-=[]{};':"\\|,.<>/?]+/;\``;

  // First Name
  if (empData.fname[0] === " ")
    errors.fname = "First character should not be a blank space";
  else if (empData.fname.length > 30)
    errors.fname = "Length should be max 30 characters";
  else if (empData.fname.match(/\d+/g) != null)
    errors.fname = "Name should not contain Integers";
  // else if (empData.fname.match(/^[^a-zA-Z0-9]+$/))
  else if (special_charecter.split("").some((c) => empData.fname.includes(c)))
    errors.fname = "No special characters allowed";

  // Last Name
  if (empData.lname[0] === " ")
    errors.lname = "First character should not be a blank space";
  else if (empData.lname.length > 30)
    errors.lname = "Length should be max 30 characters";
  else if (empData.lname.match(/\d+/g) != null)
    errors.lname = "Name should not contain Integers";
  else if (special_charecter.split("").some((c) => empData.lname.includes(c)))
    errors.lname = "No special characters allowed";

  // Gender
  if (empData.gender === "select_gender")
    errors.gender = "Please select gender";

  //Date Of Birth
  const todayDate = new Date();
  const dateOfBirth = new Date(empData.dob);
  const diffDateInDays = Math.ceil(
    Math.abs(todayDate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  if (todayDate <= dateOfBirth)
    errors.dob = "Date of Birth should not be a Future Date";
  else if (diffDateInDays >= 60 * 366 && dateOfBirth < todayDate)
    errors.dob = "Employee maximum age should be less than 60 Years";
  else if (diffDateInDays <= 15 * 366)
    errors.dob = "Employee should be atleast 15 Years Old";

  // Hire Date
  const hireDate = new Date(empData.hireDate);
  const foundationDate = new Date(1996, 0, 1);
  // console.log("-->", foundationDate, " -->", hireDate);
  const diffDOBAndHireDateInDays = Math.ceil(
    Math.abs(hireDate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  if (hireDate < dateOfBirth)
    errors.hireDate = "Hire date should not be before Date of Birth";
  else if (hireDate > todayDate)
    errors.hireDate = "Hire date should not be a Future Date";
  else if (hireDate < foundationDate)
    errors.hireDate =
      "Hire date should not be before Company's Foundation Date";
  else if (diffDOBAndHireDateInDays < 15 * 366)
    errors.hireDate = "Hire date should be atleast 15 years from Date of Birth";

  return errors;
};

const validateEmpEmpty = (
  stateFname,
  stateLname,
  stateDOB,
  stateGender,
  stateHireDate
) => {
  const errors = {};
  // console.log(stateFname, stateLname, stateDOB, stateGender, stateHireDate);
  if (stateFname) errors.fname = "*Required";
  if (stateLname) errors.lname = "*Required";
  if (stateGender) errors.gender = "*Required";
  if (stateDOB) errors.dob = "*Required";
  if (stateHireDate) errors.hireDate = "*Required";
  return errors;
};

function CreatePost() {
  // const [disable, setDisable] = useState({!formik.isValid});
  const [errorMsg, setErrorMsg] = useState([]);
  const [stateFname, setStateFname] = useState({ fname: false });
  const [stateLname, setStateLname] = useState({ lname: false });
  const [stateDOB, setStateDOB] = useState({ dob: false });
  const [stateGender, setStateGender] = useState({ gender: false });
  const [stateHireDate, setStateHireDate] = useState({ hireDate: false });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      dob: "",
      gender: "",
      hireDate: "",
    },
    validate: validateEmployee,
    // validate: validateEmpEmpty,
    onSubmit: (values) => {
      // console.log(values);
      submitPost(values);
      formik.resetForm();
    },
  });

  const stateValidate = {
    validate: validateEmpEmpty(
      stateFname,
      stateLname,
      stateDOB,
      stateGender,
      stateHireDate
    ),
  };
  // console.log(stateValidate.validate);
  // console.log(formik.values);
  const submitPost = (values) => {
    console.log(
      values.fname,
      values.lname,
      values.dob,
      values.gender,
      values.hireDate
    );
    Axios.post("http://localhost:3002/api/create", {
      fname: values.fname,
      lname: values.lname,
      dob: values.dob,
      gender: values.gender,
      hireDate: values.hireDate,
    }).then((data) => {
      // handleSubmitUtil();
      // alert(data.data);
      if (data.data === "ERROR") {
        setErrorMsg("404");
      } else {
        alert("Record Updated Successfully");
      }
    });
  };
  // empId, fname, lname, dob, gender, hiringDate

  return (
    <div className="CreateEmp">
      <div className="EmpContainerError">
        {errorMsg === "404" ? (
          <div className="Error">
            <img
              className="ErrorImage"
              alt="404 Page Not Found"
              src={errorImage}
              // src="https://agentestudio.com/uploads/post/image/69/main_how_to_design_404_page.png"
            />
          </div>
        ) : (
          <div>
            <form className="uploadEmp" onSubmit={formik.handleSubmit}>
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="John"
                  id="fname"
                  name="fname"
                  onChange={formik.handleChange}
                  value={formik.values.fname}
                  onSelect={formik.handleBlur}
                  onBlur={(e) => {
                    if (!formik.values.fname) setStateFname({ fname: true });
                    else setStateFname({ fname: false });
                  }}
                  // onChange={(formik.handleChange, formik.handleBlur)}
                  style={
                    (formik.touched.fname && formik.errors.fname) ||
                    (stateFname.fname && !formik.values.fname) ||
                    ((formik.touched.lname ||
                      formik.touched.dob ||
                      formik.touched.gender ||
                      formik.touched.hireDate) &&
                      !formik.values.fname)
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.fname && formik.errors.fname ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {formik.errors.fname}
                  </span>
                ) : null}
                {(stateFname.fname && !formik.values.fname) ||
                ((formik.touched.lname ||
                  formik.touched.dob ||
                  formik.touched.gender ||
                  formik.touched.hireDate) &&
                  !formik.values.fname) ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {stateValidate.validate.fname}
                  </span>
                ) : null}
                <p>
                  Enter First Name
                  <u
                    style={{
                      display: "inline",
                      color: "red",
                      textDecoration: "none",
                    }}
                  >
                    *
                  </u>
                </p>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  placeholder="Snow"
                  id="lname"
                  name="lname"
                  onChange={formik.handleChange}
                  value={formik.values.lname}
                  onBlur={(e) => {
                    if (!formik.values.lname) setStateLname({ lname: true });
                    else setStateLname({ lname: false });
                  }}
                  onSelect={formik.handleBlur}
                  style={
                    (formik.touched.lname && formik.errors.lname) ||
                    (stateLname.lname && !formik.values.lname) ||
                    ((formik.touched.dob ||
                      formik.touched.gender ||
                      formik.touched.hireDate) &&
                      !formik.values.lname)
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.lname && formik.errors.lname ? (
                  <span style={{ color: "red" }}>{formik.errors.lname}</span>
                ) : null}
                {(stateLname.lname && !formik.values.lname) ||
                ((formik.touched.dob ||
                  formik.touched.gender ||
                  formik.touched.hireDate) &&
                  !formik.values.lname) ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: 15,
                    }}
                  >
                    {stateValidate.validate.lname}
                  </span>
                ) : null}
                <p>
                  Enter Last Name
                  <u
                    style={{
                      display: "inline",
                      color: "red",
                      textDecoration: "none",
                    }}
                  >
                    *
                  </u>
                </p>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  placeholder="03/14/1975"
                  onFocus={(e) => {
                    e.currentTarget.type = "date";
                    e.currentTarget.focus();
                  }}
                  id="dob"
                  name="dob"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                  onBlur={(e) => {
                    if (!formik.values.dob) setStateDOB({ dob: true });
                    else setStateDOB({ dob: false });
                  }}
                  onSelect={formik.handleBlur}
                  style={
                    (formik.touched.dob && formik.errors.dob) ||
                    (stateDOB.dob && !formik.values.dob) ||
                    ((formik.touched.gender || formik.touched.hireDate) &&
                      !formik.values.dob)
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <span style={{ color: "red" }}>{formik.errors.dob}</span>
                ) : null}
                {(stateDOB.dob && !formik.values.dob) ||
                ((formik.touched.gender || formik.touched.hireDate) &&
                  !formik.values.dob) ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {stateValidate.validate.dob}
                  </span>
                ) : null}
                <p>
                  Select Date of Birth
                  <u
                    style={{
                      display: "inline",
                      color: "red",
                      textDecoration: "none",
                    }}
                  >
                    *
                  </u>
                </p>
              </div>
              <div className="inputbox">
                <select
                  type="text"
                  required="required"
                  defaultValue=""
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  value={formik.values.value}
                  onBlur={(e) => {
                    if (!formik.values.gender) setStateGender({ gender: true });
                    else setStateGender({ gender: false });
                  }}
                  onClick={formik.handleBlur}
                  style={
                    (formik.touched.gender && formik.errors.gender) ||
                    (stateGender.gender && !formik.values.gender) ||
                    (formik.touched.hireDate && !formik.values.gender)
                      ? { border: "1px solid red" }
                      : null
                  }
                >
                  <option value="" disabled={true} hidden={true}>
                    Male
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                  <option value="N">I prefer not to say</option>
                </select>
                <p>
                  Select Gender
                  <u
                    style={{
                      display: "inline",
                      color: "red",
                      textDecoration: "none",
                    }}
                  >
                    *
                  </u>
                </p>
                {formik.touched.gender && formik.errors.gender ? (
                  <span style={{ color: "red" }}>{formik.errors.gender}</span>
                ) : null}
                {(stateGender.gender && !formik.values.gender) ||
                (formik.touched.hireDate && !formik.values.gender) ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {stateValidate.validate.gender}
                  </span>
                ) : null}
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  placeholder="07/11/2007"
                  onFocus={(e) => {
                    e.currentTarget.type = "date";
                    e.currentTarget.focus();
                  }}
                  id="hireDate"
                  name="hireDate"
                  onChange={formik.handleChange}
                  value={formik.values.hireDate}
                  onBlur={(e) => {
                    if (!formik.values.hireDate)
                      setStateHireDate({ hireDate: true });
                    else setStateHireDate({ hireDate: false });
                  }}
                  onSelect={formik.handleBlur}
                  style={
                    (formik.touched.hireDate && formik.errors.hireDate) ||
                    (stateHireDate.hireDate && !formik.values.hireDate)
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.hireDate && formik.errors.hireDate ? (
                  <span style={{ color: "red" }}>{formik.errors.hireDate}</span>
                ) : null}
                {stateHireDate.hireDate && !formik.values.hireDate ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {stateValidate.validate.hireDate}
                  </span>
                ) : null}
                <p>
                  Select Hire Date
                  <u
                    style={{
                      display: "inline",
                      color: "red",
                      textDecoration: "none",
                    }}
                  >
                    *
                  </u>
                </p>
              </div>
              <div className="inputbox-1">
                <input
                  type="submit"
                  className="btn-1"
                  disabled={
                    !formik.isValid ||
                    !formik.values.fname ||
                    !formik.values.lname ||
                    !formik.values.gender ||
                    !formik.values.dob ||
                    !formik.values.hireDate
                  }
                  style={
                    !formik.isValid ||
                    !formik.values.fname ||
                    !formik.values.lname ||
                    !formik.values.gender ||
                    !formik.values.dob ||
                    !formik.values.hireDate
                      ? {
                          cursor: "not-allowed",
                          background: "#80808091",
                          color: "black",
                          border: "none",
                        }
                      : null
                  }
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
