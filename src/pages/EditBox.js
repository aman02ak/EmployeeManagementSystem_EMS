import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EditBox.css";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { Button } from "antd";
import "antd/dist/antd.css";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";

const validateEmployee = (empData) => {
  const errors = {};
  var special_charecter = `/[!@#$%^&*()_+-=[]{};':"\\|,.<>/?]+/;\``;

  // First Name
  if (empData.fname === "") errors.fname = "Please enter a valid name";
  else if (empData.fname.length > 30)
    errors.fname = "Length should be max 30 characters";
  else if (empData.fname.match(/\d+/g) != null)
    errors.fname = "Please enter a valid name";
  // else if (empData.fname.match(/^[^a-zA-Z0-9]+$/))
  else if (special_charecter.split("").some((c) => empData.fname.includes(c)))
    errors.fname = "Please enter a valid name";

  // Last Name
  if (empData.lname === "") errors.lname = "Please enter a valid name";
  else if (empData.lname.length > 30)
    errors.lname = "Length should be max 30 characters";
  else if (empData.lname.match(/\d+/g) != null)
    errors.lname = "Please enter a valid name";
  else if (special_charecter.split("").some((c) => empData.lname.includes(c)))
    errors.lname = "Please enter a valid name";

  //Date Of Birth
  const todayDate = new Date();
  const dateOfBirth = new Date(empData.dob);
  const diffDateInDays = Math.ceil(
    Math.abs(todayDate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  if (empData.dob === "") errors.dob = "Please enter a valid Date of Birth";
  else if (todayDate <= dateOfBirth)
    errors.dob = "Please enter a valid Date of Birth";
  else if (diffDateInDays >= 100 * 366 && dateOfBirth < todayDate)
    errors.dob = "Please enter a valid Date of Birth";
  else if (diffDateInDays <= 20 * 366)
    errors.dob = "Please enter a valid Date of Birth";

  // Hire Date
  const hiredate = new Date(empData.hiredate);
  const foundationDate = new Date(1996, 0, 1);
  // console.log("-->", foundationDate, " -->", hiredate);
  const diffDOBAndhiredateInDays = Math.ceil(
    Math.abs(hiredate - dateOfBirth) / (1000 * 60 * 60 * 24)
  );
  if (empData.hiredate === "")
    errors.hiredate = "Please enter a valid Hire Date";
  if (hiredate < dateOfBirth)
    errors.hiredate = "Please enter a valid Hire Date";
  else if (hiredate > todayDate)
    errors.hiredate = "Please enter a valid Hire Date";
  else if (hiredate < foundationDate)
    errors.hiredate = "Please enter a valid Hire Date";
  else if (diffDOBAndhiredateInDays < 15 * 366)
    errors.hiredate = "HPlease enter a valid Hire Date";
  return errors;
};

const EditBox = ({ record, loading }) => {
  // const [statusChange, setStatusChange] = useState(false);

  const [editRecordData, setEditRecordData] = useState([]);
  function viewIndividualRecord(id) {
    Axios.post("http://localhost:3002/api/getFromId", {
      id: id,
    }).then((data) => {
      if (data.data === "ERROR") {
        alert("404");
      } else {
        setEditRecordData(data.data[0]);
        // console.log("HAHAHA", editRecordData);
        record = data.data[0];
      }
    });
  }

  const updatePost = (values) => {
    console.log(values);
    Axios.post("http://localhost:3002/api/updateRecord", {
      fname: values.fname,
      lname: values.lname,
      dob: values.dob,
      gender: values.gender,
      hiredate: values.hiredate,
      email: values.email,
      empid: values.empid,
    }).then((data) => {
      // handleSubmitUtil();
      // alert(data.data);
      console.log(data);
      if (data.data === "ERROR") {
        // setErrorMsg("404");
        alert("404");
      } else {
        alert("Record Updated Successfully");
        // viewIndividualRecord(values.empid);
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      fname: record.fname,
      lname: record.lname,
      dob: record.dob,
      gender: record.gender,
      hiredate: record.hiredate,
      email: record.email,
    },
    enableReinitialize: true,
    validate: validateEmployee,
    onSubmit: (values) => {
      // console.log(values);
      submitPost(values);
      // formik.resetForm();
    },
  });

  if (!loading) {
    return <h2>Loading...</h2>;
  }

  function submitPost(values) {
    if (values.fname === "") values.fname = record.fname;
    if (values.lname === "") values.lname = record.lname;
    if (values.gender === "") values.gender = record.gender;
    if (values.dob === "") values.dob = record.dob;
    if (values.hiredate === "") values.hiredate = record.hiredate;
    if (values.email === "") values.email = record.email;
    if (values.fname !== "") {
      values.email = "".concat(
        values.fname.toLowerCase(),
        ".",
        Math.floor(Math.random() * 101).toString(),
        "@myCompany.com"
      );
    }
    values.empid = record.empid;

    console.log(values);
    updatePost(values);
    // viewIndividualRecord(values.empid);
  }

  console.log(formik.values);
  // console.log(formik.errors);
  console.log(formik.values.dob);
  if (record.dob) console.log(record.dob.split("T")[0]);
  if (formik.values.dob) console.log(formik.values.dob.split("T")[0]);
  console.log(formik.values.hiredate);
  const { Option } = Select;

  return (
    <div className="recordEditClass">
      <div className="recordEditClassChild">
        <Form
          onSubmit={formik.handleSubmit}
          labelCol={{ span: 4 }}
          // wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          {/* First Name */}

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter valid Input",
              },
            ]}
          >
            <Input
              type="text"
              name="fname"
              onChange={formik.handleChange}
              value={formik.values.fname}
              // placeholder={record.fname}
              style={formik.errors.fname ? { border: "2px solid red" } : null}
            />

            {formik.errors.fname ? (
              <span className="formik_errors">{formik.errors.fname}</span>
            ) : null}
          </Form.Item>
          {/* Last Name */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter valid Input",
              },
            ]}
          >
            <Input
              type="text"
              name="lname"
              onChange={formik.handleChange}
              value={formik.values.lname}
              // placeholder={record.lname}
            />
            {formik.errors.lname ? (
              <span className="formik_errors">{formik.errors.lname}</span>
            ) : null}
          </Form.Item>
          {/* Date of Birth */}
          <Form.Item
            label="Date of Birth"
            name="DateOfBirth"
            rules={[
              {
                required: true,
                message: "Please enter valid Input",
              },
            ]}
          >
            <Input
              // placeholder={record.dob}
              // onFocus={(e) => {
              //   e.currentTarget.type = "date";
              //   e.currentTarget.focus();
              // }}
              type="date"
              name="dob"
              onChange={formik.handleChange}
              value={
                formik.values.dob
                  ? formik.values.dob.split("T")[0]
                  : formik.values.dob
              }
              disabled={false}
            />
            {formik.errors.dob ? (
              <span className="formik_errors">{formik.errors.dob}</span>
            ) : null}
          </Form.Item>
          {/* Gender */}
          <Form.Item
            label="Select Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please enter valid Input",
              },
            ]}
          >
            <Select
              type="text"
              name="gender"
              onChange={(value) => formik.setFieldValue("gender", value)}
              value={formik.values.value}
              placeholder={
                record.gender === "M"
                  ? "Male"
                  : record.gender === "F"
                  ? "Female"
                  : record.gender === "O"
                  ? "Others"
                  : "Not Available"
              }
              disabled={false}
            >
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
              <Option value="O">Other</Option>
              <Option value="N">Prefer Not to Say</Option>
            </Select>
          </Form.Item>
          {/* Hire Date */}
          <Form.Item
            label="Hire Date"
            name="hireDate"
            rules={[
              {
                required: true,
                message: "Please enter valid Input",
              },
            ]}
          >
            <Input
              // placeholder={record.hiredate}
              // onFocus={(e) => {
              //   e.currentTarget.type = "date";
              //   e.currentTarget.focus();
              // }}
              type="date"
              name="hiredate"
              onChange={formik.handleChange}
              value={
                formik.values.hiredate
                  ? formik.values.hiredate.split("T")[0]
                  : formik.values.hiredate
              }
              disabled={false}
            />
            {formik.errors.hiredate ? (
              <span className="formik_errors">{formik.errors.hiredate}</span>
            ) : null}
          </Form.Item>
          {/* Email */}
          <Form.Item label="Email">
            <Input
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              disabled={true}
            />
          </Form.Item>
          {/* Submit */}
          <Form.Item>
            <Button
              type="submit"
              type="primary"
              onClick={formik.handleSubmit}
              disabled={
                !formik.isValid ||
                (formik.values.fname === record.fname &&
                  formik.values.lname === record.lname &&
                  formik.values.gender === record.gender &&
                  (record.dob && formik.values.dob
                    ? record.dob.split("T")[0] ===
                      formik.values.dob.split("T")[0]
                    : formik.values.dob === record.dob) &&
                  (record.hiredate && formik.values.hiredate
                    ? record.hiredate.split("T")[0] ===
                      formik.values.hiredate.split("T")[0]
                    : formik.values.hiredate === record.hiredate)) ||
                // formik.values.hiredate === record.hiredate) ||
                formik.values.fname === "" ||
                formik.values.lname === "" ||
                formik.values.gender === "" ||
                formik.values.dob === "" ||
                formik.values.hiredate === ""
                  ? true
                  : false
              }
              style={
                !formik.isValid ||
                (formik.values.fname === "" && formik.values.lname === "")
                  ? { cursor: "not-allowed" }
                  : {}
              }
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditBox;
