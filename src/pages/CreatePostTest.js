import React, { useState } from "react";
import Axios from "axios";
import { useFormik } from "formik";
import "./CreatePost.css";
import errorImage from "./404.jpg";

const validateEmployee = (empData) => {
  const errors = {};
  var special_charecter = `/[!@#$%^&*()_+-=[]{};':"\\|,.<>/?]+/;\``;
  // if (!empData.fname) errors.fname = "Please enter a valid name";
  if (empData.fname.length > 30)
    errors.fname = "Length should be max 30 characters";
  else if (empData.fname.match(/\d+/g) != null)
    errors.fname = "Name should not contain Integers";
  // else if (empData.fname.match(/^[^a-zA-Z0-9]+$/))
  else if (special_charecter.split("").some((c) => empData.fname.includes(c)))
    errors.fname = "No special characters allowed";

  if (!empData.lname) errors.lname = "Please enter a valid name";
  else if (empData.lname.length > 30)
    errors.lname = "Length should be max 30 characters";
  else if (empData.lname.match(/\d+/g) != null)
    errors.lname = "Name should not contain Integers";
  else if (special_charecter.split("").some((c) => empData.lname.includes(c)))
    errors.lname = "No special characters allowed";

  if (!empData.gender || empData.gender === "select_gender")
    errors.gender = "Please select gender";

  const todayDate = new Date();
  const dateOfBirth = new Date(empData.dob);
  // console.log(todayDate, dateOfBirth);
  const diffDateInDays = Math.ceil(
    Math.abs(todayDate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  // console.log(diffDateInDays);
  if (!empData.dob) errors.dob = "Please select date";
  else if (diffDateInDays <= 15 * 366)
    errors.dob = "Age can't be less than 15 Years";
  else if (todayDate <= dateOfBirth)
    errors.dob = "Employee can't be hired from Future";

  const hireDate = new Date(empData.hireDate);
  const diffDOBAndHireDateInDays = Math.ceil(
    Math.abs(hireDate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  if (!empData.hireDate) errors.hireDate = "Please select date";
  else if (diffDOBAndHireDateInDays < 15 * 366)
    errors.hireDate = "Employee can't be hired before age of 15";
  else if (hireDate > todayDate)
    errors.hireDate = "Hire date should not be a Future Date";

  return errors;
};

const validateEmpEmpty = (touched) => {
  const errors = {};
  console.log(touched);
  if (touched.fname) errors.fname = "Please enter a valid name";
  if (touched.lname) errors.lname = "Please enter a valid name";

  return errors;
};

function CreatePost() {
  // const [disable, setDisable] = useState({!formik.isValid});
  const [errorMsg, setErrorMsg] = useState([]);
  const [state, setState] = useState({});
  // setState({ fname: ["", true] });

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
    },
  });

  const stateValidate = {
    validate: validateEmpEmpty(state),
  };

  console.log("State", state);
  console.log("Check", stateValidate.validate);
  // console.log(formik.errors);
  // console.log(formik.touched);
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
      hiringDate: values.hiringDate,
    }).then((data) => {
      // handleSubmitUtil();
      // alert(data.data);
      if (data.data === "ERROR") {
        setErrorMsg("404");
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
                    if (!formik.values.fname) setState({ fname: true });
                    else setState({ fname: false });
                  }}
                  // onChange={(formik.handleChange, formik.handleBlur)}
                  style={
                    formik.touched.fname && formik.errors.fname
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.fname && formik.errors.fname ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {formik.errors.fname}
                  </span>
                ) : null}
                {state.fname && !formik.values.fname ? (
                  <span style={{ color: "red", fontSize: 15 }}>
                    {stateValidate.validate.fname}
                  </span>
                ) : null}
                <p>
                  Enter First Name<>*</>
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
                  // onBlur={formik.handleBlur}
                  onSelect={formik.handleBlur}
                  style={
                    formik.touched.lname && formik.errors.lname
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.lname && formik.errors.lname ? (
                  <span style={{ color: "red" }}>{formik.errors.lname}</span>
                ) : null}
                <p>
                  Enter Last Name<>*</>
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
                  // onBlur={formik.handleBlur}
                  onSelect={formik.handleBlur}
                  style={
                    formik.touched.dob && formik.errors.dob
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <span style={{ color: "red" }}>{formik.errors.dob}</span>
                ) : null}
                <p>
                  Select Date of Birth<>*</>
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
                  // onBlur={formik.handleBlur}
                  onClick={formik.handleBlur}
                  style={
                    formik.touched.gender && formik.errors.gender
                      ? { border: "1px solid red" }
                      : null
                  }
                >
                  <option value="" disabled={true} hidden={true}>
                    Male
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Don't want to Disclose">
                    I prefer not to say
                  </option>
                </select>
                <p>
                  Select Gender<>*</>
                </p>
                {formik.touched.gender && formik.errors.gender ? (
                  <span style={{ color: "red" }}>{formik.errors.gender}</span>
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
                  onBlur={formik.handleBlur}
                  onSelectCapture={formik.handleBlur}
                  style={
                    formik.touched.hireDate && formik.errors.hireDate
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.touched.hireDate && formik.errors.hireDate ? (
                  <span style={{ color: "red" }}>{formik.errors.hireDate}</span>
                ) : null}
                <p>
                  Select Hire Date<>*</>
                </p>
              </div>
              <div className="inputbox-1">
                <input
                  type="submit"
                  className="btn-1"
                  disabled={!formik.isValid || !formik.values.fname}
                  style={
                    !formik.isValid || !formik.values.fname
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
