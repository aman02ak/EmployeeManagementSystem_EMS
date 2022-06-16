import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useFormik } from "formik";
import "./CreatePost.css";
import errorImage from "./404.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const validateEmployee = (empData) => {
  const errors = {};
  var special_charecter = `/[!@#$%^&*()_+-=[]{};':"\\|,.<>/?]+/;\``;

  // First Name
  if (empData.fname[0] === " ") errors.fname = "Please enter a valid name";
  else if (empData.fname.length > 30)
    errors.fname = "Length should be max 30 characters";
  else if (empData.fname.match(/\d+/g) != null)
    errors.fname = "Please enter a valid name";
  // else if (empData.fname.match(/^[^a-zA-Z0-9]+$/))
  else if (special_charecter.split("").some((c) => empData.fname.includes(c)))
    errors.fname = "Please enter a valid name";

  // Last Name
  if (empData.lname[0] === " ") errors.lname = "Please enter a valid name";
  else if (empData.lname.length > 30)
    errors.lname = "Length should be max 30 characters";
  else if (empData.lname.match(/\d+/g) != null)
    errors.lname = "Please enter a valid name";
  else if (special_charecter.split("").some((c) => empData.lname.includes(c)))
    errors.lname = "Please enter a valid name";

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
    errors.dob = "Please enter a valid Date of Birth";
  else if (diffDateInDays >= 100 * 366 && dateOfBirth < todayDate)
    errors.dob = "Please enter a valid Date of Birth";
  else if (diffDateInDays <= 20 * 366)
    errors.dob = "Please enter a valid Date of Birth";

  // Hire Date
  const hireDate = new Date(empData.hireDate);
  const foundationDate = new Date(1996, 0, 1);
  // console.log("-->", foundationDate, " -->", hireDate);
  const diffDOBAndHireDateInDays = Math.ceil(
    Math.abs(hireDate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  if (hireDate < dateOfBirth)
    errors.hireDate = "Please enter a valid Hire Date";
  else if (hireDate > todayDate)
    errors.hireDate = "Please enter a valid Hire Date";
  else if (hireDate < foundationDate)
    errors.hireDate = "Please enter a valid Hire Date";
  else if (diffDOBAndHireDateInDays < 15 * 366)
    errors.hireDate = "HPlease enter a valid Hire Date";

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
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYn4HLNI93L5Cp8W_BoimZlpwiSi_Y2mLW9qGoYmUe29v9EuCrv1GL1QyeDWXOMS3OLI&usqp=CAU"
  );
  const [imageMsg, setImageMsg] = useState("");
  const [profileImage, setProfileImage] = useState(false);
  const [imagePathDB, setImagePathDB] = useState("");

  const resetImage = function () {
    setProfileImage(false);
    setImage(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYn4HLNI93L5Cp8W_BoimZlpwiSi_Y2mLW9qGoYmUe29v9EuCrv1GL1QyeDWXOMS3OLI&usqp=CAU"
    );
    setImageMsg("");
  };

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
      resetImage();
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

  const submitPost = (values) => {
    Axios.post("http://localhost:3002/api/create", {
      fname: values.fname,
      lname: values.lname,
      dob: values.dob,
      gender: values.gender,
      hireDate: values.hireDate,
      picturepath: imagePathDB,
    }).then((data) => {
      // handleSubmitUtil();
      // alert(data.data);
      console.log(data);
      if (data.data === "ERROR") {
        setErrorMsg("404");
      } else {
        alert("Record Updated Successfully");
      }
    });
  };

  const uploadPhoto = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    // setImage(URL.createObjectURL(e.target.files[0]));
    formData.append("title", "IMAGE_NAME_AMAN_DUBEY");
    console.log(formData);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };

    const url = "http://localhost:3002/api/image";
    Axios.post(url, formData).then((data) => {
      if (data.data === "ERROR") {
        console.log(data);
        setErrorMsg("404");
      } else {
        // console.log("Response ", data.data);
        var path = data.data.path.split("\\");
        var path_print = `/` + path[1] + `/` + path[2];
        setImage(process.env.PUBLIC_URL + path_print);
        setImagePathDB(path_print);
        setImageMsg(path[2]);
        setProfileImage(true);
      }
    });
  };

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
              {/* NEW INPUT BOX */}
              <div className="inputbox">
                <input
                  type="file"
                  name="myImage"
                  title="Choose a video please"
                  // value="name"
                  placeholder="name"
                  onChange={(e) => {
                    uploadPhoto(e);
                    if (profileImage === false) e = null;
                  }}
                  style={{ width: "110px", backgroundColor: "grey" }}
                />
                <p>
                  Upload Image
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
                <span style={{ paddingTop: "6px", color: "green" }}>
                  {imageMsg}
                </span>
              </div>
              <div className="inputbox-2">
                <img alt="Upload" src={image} />
              </div>
              {/* END INPUT FILE */}
              <div className="inputbox-1">
                <Button
                  type="submit"
                  // className="button-15"
                  varient="primary"
                  disabled={
                    !formik.isValid ||
                    !formik.values.fname ||
                    !formik.values.lname ||
                    !formik.values.gender ||
                    !formik.values.dob ||
                    !formik.values.hireDate ||
                    !profileImage
                  }
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
