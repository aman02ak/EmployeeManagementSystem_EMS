import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { useHistory } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import "./MainPage.css";
import errorImage from "./404.jpg";
import CreatePostTest_2 from "./CreatePostTest_2";
import Pagination from "./Pagination";
import EditBox from "./EditBox";
// import Button from "@restart/ui/esm/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
import { Upload, Button, Input } from "antd";

const { Search } = Input;

function MainPage() {
  const [postList, setPostList] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const isOpen = useState();
  var closeSpan = false;

  // let history = useHistory();

  function viewRecord() {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      if (data.data === "ERROR") {
        setErrorMsg("404");
      } else {
        setPostList(data.data);
      }
    });
  }
  useEffect(() => {
    viewRecord();
  }, []);

  function viewObject(id) {
    Axios.post("http://localhost:3002/api/delete", {
      empid: id,
    }).then((data) => {
      if (data.data === "ERROR") {
        setErrorMsg("404");
      } else {
        viewRecord();
      }
    });
  }

  const [editRecordData, setEditRecordData] = useState([]);
  function viewIndividualRecord(id) {
    Axios.post("http://localhost:3002/api/getFromId", {
      id: id,
    }).then((data) => {
      if (data.data === "ERROR") {
        setErrorMsg("404");
      } else {
        setEditRecordData(data.data[0]);
        // setLoading(false);
      }
    });
  }
  // console.log(editRecordData);
  const [loading, setLoading] = useState(false);

  const editRecord = (id) => {
    setLoading(true);
    let ele = document.getElementById("editModal");
    ele.style.display = "block";
    viewIndividualRecord(id);
  };

  const closeEditRecord = () => {
    let ele = document.getElementById("editModal");
    ele.style.display = "none";
    setLoading(false);
    setEditRecordData("");
    viewRecord();
  };

  for (var i = 0; i < postList.length; i++) {
    // let check = document.getElementById(postList[i].empid);
    // console.log(postList[i].empid);
    // console.log(check);
    isOpen[`${postList[i].empid}`] = false;
  }
  // console.log(isOpen);
  function toggle(id) {
    let check = document.getElementById(id);
    // console.log(check.style);
    let currentValue = check.style.getPropertyValue("display");
    // console.log(typeof currentValue);
    if (currentValue === "none") check.style.setProperty("display", "block");
    else check.style.setProperty("display", "none");
  }
  // const items = [];
  // postList.map((val_1, key_1) => {
  //   items.push({ id: key_1, value: val_1.fname });
  // });
  const [searchItem, setSearchItem] = useState("");
  function onChange(e) {
    // console.log(e.target.value.toLowerCase());
    setSearchItem(e.target.value);
    // console.log(searchItem);
  }

  const [CreatePostButton, setCreatePostButton] = useState(false);

  function changeButton() {
    if (CreatePostButton) {
      // onClick this needs to be Closed
      let button_1 = document.getElementById("routeCreatePostButton");
      button_1.innerHTML = "New Entry";
    }
    closeSpan = true;
    setCreatePostButton(!CreatePostButton);
    viewRecord();
  }
  if (CreatePostButton) {
    let button_1 = document.getElementById("routeCreatePostButton");
    button_1.innerHTML = "Close";
  }
  // window.onload = function () {
  //   if (!CreatePostButton) {
  //     let button_1 = document.getElementById("routeCreatePostButton");
  //     button_1.innerHTML = "New Entry";
  //   }
  // };

  const enlargeImage = function (e) {
    // console.log(e.target.id);
    let toEnable = document.getElementById("myModal");

    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    toEnable.style.display = "block";
    modalImg.src = e.target.src;
    modalImg.alt = e.target.id.slice(1);
    captionText.innerHTML = e.target.alt;
  };

  const [profileImage, setProfileImage] = useState(false);
  const [imageMsg, setImageMsg] = useState("");
  const [imagePathDB, setImagePathDB] = useState("");
  const [imageEmpIDDB, setImageEmpIDDB] = useState("");

  // When the user clicks on <span> (x), close the modal
  const closeEnlarge = function () {
    let toEnable = document.getElementById("myModal");
    toEnable.style.display = "none";
    setImageMsg("");
    setProfileImage(false);
    viewRecord();

    let toDisable = document.getElementById("myModelArticleCenterInput");
    let toDisable_1 = document.getElementById("myModelArticleCenterUpload");
    // console.log(toDisable.value);
    toDisable.value = "";
    toDisable.style.display = "none";
    toDisable_1.style.display = "none";
  };

  const uploadPhoto = (e) => {
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);

    const url = "http://localhost:3002/api/image";
    Axios.post(url, formData).then((data) => {
      if (data.data === "ERROR") {
        console.log(data);
        setErrorMsg("404");
      } else {
        var path = data.data.path.split("\\");
        var path_print = `/` + path[1] + `/` + path[2];

        var modalImg = document.getElementById("img01");
        modalImg.src = process.env.PUBLIC_URL + path_print;
        console.log(modalImg.alt);
        setImagePathDB(path_print);
        setProfileImage(true);
      }
    });
  };

  const uploadCnf = function () {
    if (profileImage) {
      Axios.post("http://localhost:3002/api/updateImage", {
        empid: imageEmpIDDB,
        picturepath: imagePathDB,
      }).then((data) => {
        // handleSubmitUtil();
        // alert(data.data);
        console.log(data);
        if (data.data === "ERROR") {
          setErrorMsg("404");
        } else {
          // alert("Record Updated Successfully");
          let toDisable = document.getElementById("myModelArticleCenterInput");
          let toDisable_1 = document.getElementById(
            "myModelArticleCenterUpload"
          );
          toDisable.style.display = "none";
          toDisable_1.style.display = "none";
          setImagePathDB();
          setImageMsg("Image Updated");
        }
      });
    }
  };

  const updatePic = function (e) {
    var modalImg = document.getElementById("img01");
    let toEnable = document.getElementById("myModelArticleCenterInput");
    let toEnable_1 = document.getElementById("myModelArticleCenterUpload");

    toEnable.style.display = "block";
    toEnable_1.style.display = "block";

    // console.log(toEnable);
    console.log(modalImg.alt);
    setImageEmpIDDB(modalImg.alt);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="MainPage">
      <div
        className="mainPageRoute"
        style={{ display: "block", margin: "5px", minHeight: "42px" }}
      >
        <Button
          // className="button-15"
          // varient="primary"
          type="primary"
          onClick={() => {
            changeButton();
          }}
          // style={{ border: "none", cursor: "pointer" }}
        >
          <span id="routeCreatePostButton">New Entry</span>
        </Button>
        <div
          className="searchBoxInput"
          style={{
            // border: "1px solid black",
            // borderRadius: "20px",
            // padding: "10px",
            // width: "130px",
            // height: "20px",
            float: "right",
          }}
        >
          <Search
            type="text"
            placeholder="Search in page by name & email . . ."
            // onSearch={(e) => {
            //   onChange(e);
            // }}
            onChange={(e) => {
              onChange(e);
            }}
            style={{
              // border: "0.5px solid black",
              width: "25vw",
              // height: "40px",
              float: "left",
              fontSize: "18px",
            }}
          />
          {/* <input
            type="text"
            placeholder="Search in page by name & email . . ."
            style={{
              border: "1px solid black",
              borderRadius: "20px",
              padding: "10px",
              width: "25vw",
              height: "40px",
              float: "left",
              fontSize: "18px",
              // height: "25px",
            }}
            onChange={(e) => {
              onChange(e);
              // if (e.target.value) setCreatePostButton(false);
            }}
          /> */}
        </div>
        <div
          // id="createPostDiv"
          className="modal"
          style={
            !CreatePostButton
              ? { display: "none" }
              : { display: "block", zIndex: 999 }
          }
        >
          <span className="close" onClick={changeButton}>
            &times;
          </span>
          <div className="myModalDisplay">
            <CreatePostTest_2 closeSpan={closeSpan} />
          </div>
        </div>
      </div>
      <div id="myModal" className="modal">
        <span className="close" onClick={closeEnlarge}>
          &times;
        </span>
        <div className="myModalDisplay">
          <div className="myModalSection">
            <div className="myModelSectionCenter">
              <img className="modal-img" alt="" id="img01"></img>
              <div id="caption"></div>
            </div>
          </div>
          <div className="myModalArticle">
            <div className="myModelArticleCenter">
              <Button type="primary" onClick={() => updatePic()}>
                Update
              </Button>
              {/* <Upload id="myModelArticleCenterInput">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload> */}

              <input
                id="myModelArticleCenterInput"
                type="file"
                onChange={(e) => uploadPhoto(e)}
                style={{
                  width: "200px",
                  color: "white",
                }}
                icon={<UploadOutlined />}
              />
              <Button
                type="primary"
                id="myModelArticleCenterUpload"
                onClick={uploadCnf}
              >
                Upload
              </Button>
              {profileImage ? (
                <div
                  style={{
                    color: "green",
                    // backgroundColor: "green",
                    padding: "5px",
                    width: "115px",
                    fontWeight: "600",
                    fontSize: "800",
                  }}
                >
                  {imageMsg}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="editModal" style={{ zIndex: 999 }}>
        {loading ? (
          <div>
            <span className="close" onClick={closeEditRecord}>
              &times;
            </span>
            <div className="myModalDisplay">
              <EditBox record={editRecordData} loading={loading} />
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      <div className="EmpContainer">
        {currentPosts
          .filter((val, key) => {
            if (searchItem === "" || !searchItem) {
              return val;
            } else if (
              currentPosts[key].fname
                .toLowerCase()
                .includes(searchItem.toLowerCase()) ||
              currentPosts[key].lname
                .toLowerCase()
                .includes(searchItem.toLowerCase()) ||
              currentPosts[key].email
                .toLowerCase()
                .includes(searchItem.toLowerCase())
            ) {
              return val;
            } else {
              return "";
            }
          })
          .map((val, key) => {
            return (
              <div className="Emp" key={key}>
                <div className="EmpDisplay">
                  <div className="EmpContent">
                    <img
                      alt={val.fname}
                      id={`m${val.empid}`}
                      src={
                        val.picturepath && val.picturepath.length !== 0
                          ? val.picturepath
                          : "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={(e) => enlargeImage(e)}
                    ></img>
                    <div className="EmpContentDetails">
                      <span>
                        {val.fname} {val.lname}
                      </span>
                      <span>{val.email}</span>
                    </div>
                  </div>
                  <div className="EmpMenu" tabIndex="-1">
                    {/* <DownOutlined
                      onClick={() => {
                        toggle(val.empid);
                      }}
                    /> */}
                    <Button
                      // variant="primary"
                      type="primary"
                      onClick={() => {
                        toggle(val.empid);
                      }}
                      style={{
                        width: "100px",
                      }}
                    >
                      View
                    </Button>
                    <Button
                      // variant="warning"
                      type="primary"
                      // style={{ background: "#ffc107", borderColor: "#ffc107" }}
                      onClick={() => {
                        editRecord(val.empid);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this record?"
                          )
                        )
                          viewObject(val.empid);
                      }}
                      // className="button-15"
                      // variant="danger"
                      type="primary"
                      danger
                    >
                      Delete
                    </Button>
                    {/* <div className="three-dots"></div> */}
                  </div>
                </div>
                <div
                  className="EmpHide"
                  id={val.empid}
                  style={{ display: "none" }}
                >
                  <div className="dropdown">
                    <div className="dropdown_section">
                      <div className="EmpIndividualContent">
                        <p>Employee Id : {val.empid}</p>
                        <p>
                          Date Of Birth: {val.dob.slice(8, 10)}/
                          {val.dob.slice(5, 7)}/{val.dob.slice(0, 4)}
                        </p>
                        <p>
                          Gender:{" "}
                          {val.gender === "M"
                            ? "Male"
                            : val.gender === "F"
                            ? "Female"
                            : val.gender === "O"
                            ? "Others"
                            : "Not Available"}
                        </p>
                        <p>
                          Hire Date: {val.hiredate.slice(8, 10)}/
                          {val.hiredate.slice(5, 7)}/{val.hiredate.slice(0, 4)}
                        </p>
                      </div>
                    </div>
                    {/* <div className="dropdown_article">
                      <div className="dropdown_article_center">
                        <Button
                          variant="warning"
                          onClick={() => {
                            editRecord(val.empid);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this record?"
                              )
                            )
                              viewObject(val.empid);
                          }}
                          
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={postList.length}
        paginate={paginate}
      />

      <div
        className="EmpContainerError"
        style={errorMsg !== "404" ? { display: "none" } : { display: "block" }}
      >
        {errorMsg === "404" ? (
          <div className="Error">
            <img
              className="ErrorImage"
              alt="404 Page Not Found"
              src={errorImage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MainPage;
