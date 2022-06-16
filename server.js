const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// General Call
app.get("/api", (req, res) => {
  console.log(`----${req.headers["user-agent"]} has access to root url----`);
  console.log("Welcome onboard! Start Working");
  res.send("Welcome onboard! Start Working");
});

// Route to get all employee
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      console.log("Data Collected Successfully");
      res.send(result.rows);
      // console.log(result.rows);
    }
  });
});

// Route to get one employee
app.post("/api/getFromId", (req, res) => {
  const id = req.body.id;
  // console.log(req);
  db.query(`SELECT * FROM employee where empid = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      console.log(
        "Individual Data Collected Successfully for Employee Id-",
        id
      );
      // console.log(result.rows);
      res.send(result.rows);
    }
  });
});

// Image Upload
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    // console.log(req);
    // console.log(req.body.title);
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

app.post("/api/image", (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      res.send(req.file);
    }
  });
});

// // Route for creating the new employee
app.post("/api/create", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const hireDate = req.body.hireDate;
  const picturepath = req.body.picturepath;
  const email = "".concat(
    fname.toLowerCase(),
    ".",
    Math.floor(Math.random() * 101).toString(),
    "@myCompany.com"
  );

  // console.log(fname, lname, dob, gender, hireDate, picturepath, email);
  // console.log(
  //   `INSERT INTO employee (fname, lname, dob, gender, hiredate, picturepath, email) VALUES ('${fname}', '${lname}', '${dob}', '${gender}', '${hireDate}', '${picturepath}', '${email}')`
  // );

  db.query(
    `INSERT INTO employee (fname, lname, dob, gender, hiredate, picturepath, email) VALUES ('${fname}', '${lname}', '${dob}', '${gender}', '${hireDate}', '${picturepath}', '${email}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("ERROR! Please try Again");
        res.send("ERROR");
      } else {
        console.log("New Record Successfully Inserted");
        res.send("Record Updated");
      }
    }
  );
});

app.post("/api/updateImage", (req, res) => {
  const picturepath = req.body.picturepath;
  const empid = req.body.empid;

  // console.log(empid, picturepath);
  // console.log(
  //   `UPDATE employee SET picturepath = '${picturepath}' where empid = '${empid}'`
  // );
  // res.send("Record Updated");
  db.query(
    `UPDATE employee SET picturepath = '${picturepath}' where empid = '${empid}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("ERROR! Please try Again");
        res.send("ERROR");
      } else {
        console.log("New Record Successfully Inserted");
        res.send("Record Updated");
      }
    }
  );
});

app.post("/api/updateRecord", (req, res) => {
  const empid = req.body.empid;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const hiredate = req.body.hiredate;
  const email = req.body.email;

  // console.log(req.body);
  // console.log(
  //   `UPDATE employee SET fname='${fname}', lname='${lname}', dob='${dob}', gender='${gender}', hiredate='${hiredate}', email='${email}' where empid = ${empid}`
  // );
  // res.send("Record Updated");
  db.query(
    `UPDATE employee SET fname='${fname}', lname='${lname}', dob='${dob}', gender='${gender}', hiredate='${hiredate}', email='${email}' where empid = ${empid}`,
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("ERROR! Please try Again");
        res.send("ERROR");
      } else {
        console.log("Record Updated Successfully");
        res.send("Record Updated");
      }
    }
  );
});

// Delete record
app.post("/api/delete", (req, res) => {
  const empid = req.body.empid;

  console.log(req.body);
  // console.log(fname, lname, dob, gender, hireDate);
  db.query(`DELETE FROM employee WHERE empid = '${empid}'`, (err, result) => {
    if (err) {
      console.log(err);
      console.log("ERROR! Please try Again");
      res.send("ERROR");
    } else {
      console.log("Record deleted successfully");
      res.send("Record deleted successfully");
    }
  });
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running on ${PORT}`);
  } else {
    console.log(`Server not running '404'`);
  }
});
