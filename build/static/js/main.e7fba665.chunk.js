(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{140:function(e,a,t){},141:function(e,a,t){},142:function(e,a,t){},160:function(e,a,t){},162:function(e,a,t){},232:function(e,a,t){},233:function(e,a,t){},237:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(36),s=t.n(r),d=(t(140),t(128)),i=t(19),c=(t(141),t(142),t(14)),o=t(34),m=t.n(o),u=t(244),h=(t(160),t.p+"static/media/404.9c02e504.jpg"),b=t(38),j=t(86),p=(t(162),t(108),t(109),t(241)),O=t(240),g=t(242),v=t(132),f=t(4),x=function(e){var a={},t="/[!@#$%^&*()_+-=[]{};':\"\\|,.<>/?]+/;`";" "===e.fname[0]?a.fname="Please enter a valid name":e.fname.length>30?a.fname="Length should be max 30 characters":(null!=e.fname.match(/\d+/g)||t.split("").some((function(a){return e.fname.includes(a)})))&&(a.fname="Please enter a valid name")," "===e.lname[0]?a.lname="Please enter a valid name":e.lname.length>30?a.lname="Length should be max 30 characters":(null!=e.lname.match(/\d+/g)||t.split("").some((function(a){return e.lname.includes(a)})))&&(a.lname="Please enter a valid name"),"select_gender"===e.gender&&(a.gender="Please select gender");var n=new Date,l=new Date(e.dob),r=Math.ceil(Math.abs(n-l)/864e5);(n<=l||r>=36600&&l<n||r<=7320)&&(a.dob="Please enter a valid Date of Birth");var s=new Date(e.hireDate),d=new Date(1996,0,1),i=Math.ceil(Math.abs(s-l)/864e5);return s<l||s>n||s<d?a.hireDate="Please enter a valid Hire Date":i<5490&&(a.hireDate="HPlease enter a valid Hire Date"),a},y=function(e,a,t,n,l){var r={};return e&&(r.fname="*Required"),a&&(r.lname="*Required"),n&&(r.gender="*Required"),t&&(r.dob="*Required"),l&&(r.hireDate="*Required"),r};var C=function(e){var a,t=e.closeSpan,l=Object(n.useState)([]),r=Object(c.a)(l,2),s=r[0],d=r[1],i=Object(n.useState)({fname:!1}),o=Object(c.a)(i,2),u=o[0],C=o[1],N=Object(n.useState)({lname:!1}),D=Object(c.a)(N,2),I=D[0],S=D[1],E=Object(n.useState)({dob:!1}),M=Object(c.a)(E,2),B=M[0],P=M[1],w=Object(n.useState)({gender:!1}),R=Object(c.a)(w,2),q=R[0],L=R[1],k=Object(n.useState)({hireDate:!1}),F=Object(c.a)(k,2),A=F[0],T=F[1],H=Object(n.useState)("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYn4HLNI93L5Cp8W_BoimZlpwiSi_Y2mLW9qGoYmUe29v9EuCrv1GL1QyeDWXOMS3OLI&usqp=CAU"),U=Object(c.a)(H,2),_=U[0],z=U[1],G=Object(n.useState)(""),V=Object(c.a)(G,2),W=V[0],Y=V[1],J=Object(n.useState)(!1),Q=Object(c.a)(J,2),X=Q[0],Z=Q[1],$=Object(n.useState)(""),K=Object(c.a)($,2),ee=K[0],ae=K[1],te=Object(j.a)({initialValues:{fname:"",lname:"",dob:"",gender:"",hireDate:""},validate:x,onSubmit:function(e){le(e),te.resetForm(),Z(!1),z("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYn4HLNI93L5Cp8W_BoimZlpwiSi_Y2mLW9qGoYmUe29v9EuCrv1GL1QyeDWXOMS3OLI&usqp=CAU"),Y("")}}),ne={validate:y(u,I,B,q,A)},le=function(e){m.a.post("http://localhost:3002/api/create",{fname:e.fname,lname:e.lname,dob:e.dob,gender:e.gender,hireDate:e.hireDate,picturepath:ee}).then((function(e){console.log(e),"ERROR"===e.data?d("404"):alert("Record Updated Successfully")}))};t&&te.resetForm();var re=p.a.Option;return console.log("Form Data",te.values),Object(f.jsx)("div",{className:"CreateEmp",children:Object(f.jsx)("div",{className:"EmpContainerError",children:"404"===s?Object(f.jsx)("div",{className:"Error",children:Object(f.jsx)("img",{className:"ErrorImage",alt:"404 Page Not Found",src:h})}):Object(f.jsx)("div",{children:Object(f.jsxs)(O.a,{labelCol:{span:4},layout:"horizontal",onSubmit:te.handleSubmit,children:[Object(f.jsxs)(O.a.Item,{label:"First Name",name:"fname",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"text",placeholder:"John",id:"fname",name:"fname",onChange:te.handleChange,value:te.values.fname,onSelect:te.handleBlur,onBlur:function(e){te.values.fname?C({fname:!1}):C({fname:!0})},style:te.touched.fname&&te.errors.fname||u.fname&&!te.values.fname||(te.touched.lname||te.touched.dob||te.touched.gender||te.touched.hireDate)&&!te.values.fname?{border:"2px solid red"}:null}),Object(f.jsxs)("div",{className:"errorBox",children:[te.touched.fname&&te.errors.fname?Object(f.jsx)("span",{style:{color:"red",fontSize:15},children:te.errors.fname}):null,u.fname&&!te.values.fname||(te.touched.lname||te.touched.dob||te.touched.gender||te.touched.hireDate)&&!te.values.fname?Object(f.jsx)("span",{style:{color:"red",fontSize:15},children:ne.validate.fname}):null]})]}),Object(f.jsxs)(O.a.Item,{label:"Last Name",name:"lname",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"text",required:"required",placeholder:"Snow",id:"lname",name:"lname",onChange:te.handleChange,value:te.values.lname,onBlur:function(e){te.values.lname?S({lname:!1}):S({lname:!0})},onSelect:te.handleBlur,style:te.touched.lname&&te.errors.lname||I.lname&&!te.values.lname||(te.touched.dob||te.touched.gender||te.touched.hireDate)&&!te.values.lname?{border:"1px solid red"}:null}),Object(f.jsxs)("div",{className:"errorBox",children:[te.touched.lname&&te.errors.lname?Object(f.jsx)("span",{style:{color:"red"},children:te.errors.lname}):null,I.lname&&!te.values.lname||(te.touched.dob||te.touched.gender||te.touched.hireDate)&&!te.values.lname?Object(f.jsx)("span",{style:{color:"red",fontSize:15},children:ne.validate.lname}):null]})]}),Object(f.jsxs)(O.a.Item,{label:"Date of Birth",name:"dob",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"text",required:"required",placeholder:"03/14/1975",onFocus:function(e){e.currentTarget.type="date",e.currentTarget.focus()},id:"dob",name:"dob",onChange:te.handleChange,value:te.values.dob,onBlur:function(e){te.values.dob?P({dob:!1}):P({dob:!0})},onSelect:te.handleBlur,style:te.touched.dob&&te.errors.dob||B.dob&&!te.values.dob||(te.touched.gender||te.touched.hireDate)&&!te.values.dob?{border:"1px solid red"}:null}),Object(f.jsxs)("div",{className:"errorBox",children:[te.touched.dob&&te.errors.dob?Object(f.jsx)("span",{style:{color:"red"},children:te.errors.dob}):null,B.dob&&!te.values.dob||(te.touched.gender||te.touched.hireDate)&&!te.values.dob?Object(f.jsx)("span",{style:{color:"red",fontSize:15},children:ne.validate.dob}):null]})]}),Object(f.jsxs)(O.a.Item,{label:"Select Gender",name:"gender",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsxs)(p.a,{type:"text",required:"required",defaultValue:"",id:"gender",name:"gender",onChange:function(e){return te.setFieldValue("gender",e)},value:te.values.value,onBlur:function(e){te.values.gender?L({gender:!1}):L({gender:!0})},onClick:function(){te.touched.gender=!0},style:te.touched.gender&&te.errors.gender||q.gender&&!te.values.gender||te.touched.hireDate&&!te.values.gender?{border:"1px solid red"}:null,children:[Object(f.jsxs)(p.a.Option,{value:"",disabled:!0,hidden:!0,style:{color:"#b5b5b5"},children:[Object(f.jsx)("em",{style:{fontStyle:"normal",color:"#b5b5b5"},children:"Male"})," "]},"1"),Object(f.jsx)(re,{value:"M",children:"Male"},"2"),Object(f.jsx)(re,{value:"F",children:"Female"},"3"),Object(f.jsx)(re,{value:"O",children:"Other"},"4"),Object(f.jsx)(re,{value:"N",children:"Prefer Not to Say"},"5")]}),Object(f.jsxs)("div",{className:"errorBox",children:[te.touched.gender&&te.errors.gender?Object(f.jsx)("span",{style:{color:"red"},children:te.errors.gender}):null,q.gender&&!te.values.gender||te.touched.hireDate&&!te.values.gender?Object(f.jsx)("span",{style:{color:"red",fontSize:15},children:ne.validate.gender}):null]})]}),Object(f.jsxs)(O.a.Item,{label:"Hire Date",name:"hiredate",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"text",required:"required",placeholder:"07/11/2007",onFocus:function(e){e.currentTarget.type="date",e.currentTarget.focus()},id:"hireDate",name:"hireDate",onChange:te.handleChange,value:te.values.hireDate,onBlur:function(e){te.values.hireDate?T({hireDate:!1}):T({hireDate:!0})},onSelect:te.handleBlur,style:te.touched.hireDate&&te.errors.hireDate||A.hireDate&&!te.values.hireDate?{border:"1px solid red"}:null}),Object(f.jsxs)("div",{className:"errorBox",children:[te.touched.hireDate&&te.errors.hireDate?Object(f.jsx)("span",{style:{color:"red"},children:te.errors.hireDate}):null,A.hireDate&&!te.values.hireDate?Object(f.jsx)("span",{style:{color:"red",fontSize:15},children:ne.validate.hireDate}):null]})]}),Object(f.jsxs)(O.a.Item,{label:"Upload Image",name:"uploadImage",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"file",name:"myImage",title:"Choose a video please",placeholder:"name",onChange:function(e){!function(e){console.log(e.target.files[0]);var a=new FormData;a.append("myImage",e.target.files[0]),a.append("title","IMAGE_NAME_AMAN_DUBEY"),console.log(a),m.a.post("http://localhost:3002/api/image",a).then((function(e){if("ERROR"===e.data)console.log(e),d("404");else{var a=e.data.path.split("\\"),t="/"+a[1]+"/"+a[2];z(""+t),ae(t),Y(a[2]),Z(!0)}}))}(e),!1===X&&(e=null)}}),Object(f.jsx)("span",{style:{paddingTop:"6px",color:"green"},children:W})]}),Object(f.jsx)("div",{className:"inputbox-2",children:Object(f.jsx)("img",{alt:"Upload",src:_})}),Object(f.jsx)(O.a.Item,{children:Object(f.jsx)(v.a,(a={type:"submit"},Object(b.a)(a,"type","primary"),Object(b.a)(a,"onClick",te.handleSubmit),Object(b.a)(a,"disabled",!te.isValid||!te.values.fname||!te.values.lname||!te.values.gender||!te.values.dob||!te.values.hireDate||!X),Object(b.a)(a,"children","Submit"),a))})]})})})})},N=(t(232),function(e){for(var a=e.postsPerPage,t=e.totalPosts,n=e.paginate,l=[],r=1;r<=Math.ceil(t/a);r++)l.push(r);return Object(f.jsx)("div",{className:"paginationBox",children:Object(f.jsx)("div",{className:"paginationBoxRight",children:l.map((function(e){return Object(f.jsx)("div",{className:"page-item",children:Object(f.jsx)("span",{onClick:function(){return n(e)},className:"page-link",children:e})},e)}))})})}),D=(t(233),function(e){var a={},t="/[!@#$%^&*()_+-=[]{};':\"\\|,.<>/?]+/;`";""===e.fname?a.fname="Please enter a valid name":e.fname.length>30?a.fname="Length should be max 30 characters":(null!=e.fname.match(/\d+/g)||t.split("").some((function(a){return e.fname.includes(a)})))&&(a.fname="Please enter a valid name"),""===e.lname?a.lname="Please enter a valid name":e.lname.length>30?a.lname="Length should be max 30 characters":(null!=e.lname.match(/\d+/g)||t.split("").some((function(a){return e.lname.includes(a)})))&&(a.lname="Please enter a valid name");var n=new Date,l=new Date(e.dob),r=Math.ceil(Math.abs(n-l)/864e5);(""===e.dob||n<=l||r>=36600&&l<n||r<=7320)&&(a.dob="Please enter a valid Date of Birth");var s=new Date(e.hiredate),d=new Date(1996,0,1),i=Math.ceil(Math.abs(s-l)/864e5);return""===e.hiredate&&(a.hiredate="Please enter a valid Hire Date"),s<l||s>n||s<d?a.hiredate="Please enter a valid Hire Date":i<5490&&(a.hiredate="HPlease enter a valid Hire Date"),a}),I=function(e){var a,t=e.record,l=e.loading,r=Object(n.useState)([]),s=Object(c.a)(r,2);s[0],s[1];var d=Object(j.a)({initialValues:{fname:t.fname,lname:t.lname,dob:t.dob,gender:t.gender,hiredate:t.hiredate,email:t.email},enableReinitialize:!0,validate:D,onSubmit:function(e){!function(e){""===e.fname&&(e.fname=t.fname);""===e.lname&&(e.lname=t.lname);""===e.gender&&(e.gender=t.gender);""===e.dob&&(e.dob=t.dob);""===e.hiredate&&(e.hiredate=t.hiredate);""===e.email&&(e.email=t.email);""!==e.fname&&(e.email="".concat(e.fname.toLowerCase(),".",Math.floor(101*Math.random()).toString(),"@myCompany.com"));e.empid=t.empid,console.log(e),function(e){console.log(e),m.a.post("http://localhost:3002/api/updateRecord",{fname:e.fname,lname:e.lname,dob:e.dob,gender:e.gender,hiredate:e.hiredate,email:e.email,empid:e.empid}).then((function(e){console.log(e),"ERROR"===e.data?alert("404"):alert("Record Updated Successfully")}))}(e)}(e)}});if(!l)return Object(f.jsx)("h2",{children:"Loading..."});console.log(d.values),console.log(d.values.dob),t.dob&&console.log(t.dob.split("T")[0]),d.values.dob&&console.log(d.values.dob.split("T")[0]),console.log(d.values.hiredate);var i=p.a.Option;return Object(f.jsx)("div",{className:"recordEditClass",children:Object(f.jsx)("div",{className:"recordEditClassChild",children:Object(f.jsxs)(O.a,{onSubmit:d.handleSubmit,labelCol:{span:4},layout:"horizontal",children:[Object(f.jsxs)(O.a.Item,{label:"First Name",name:"firstName",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"text",name:"fname",onChange:d.handleChange,value:d.values.fname,style:d.errors.fname?{border:"2px solid red"}:null}),d.errors.fname?Object(f.jsx)("span",{className:"formik_errors",children:d.errors.fname}):null]}),Object(f.jsxs)(O.a.Item,{label:"Last Name",name:"lastName",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"text",name:"lname",onChange:d.handleChange,value:d.values.lname}),d.errors.lname?Object(f.jsx)("span",{className:"formik_errors",children:d.errors.lname}):null]}),Object(f.jsxs)(O.a.Item,{label:"Date of Birth",name:"DateOfBirth",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"date",name:"dob",onChange:d.handleChange,value:d.values.dob?d.values.dob.split("T")[0]:d.values.dob,disabled:!1}),d.errors.dob?Object(f.jsx)("span",{className:"formik_errors",children:d.errors.dob}):null]}),Object(f.jsx)(O.a.Item,{label:"Select Gender",name:"gender",rules:[{required:!0,message:"Please enter valid Input"}],children:Object(f.jsxs)(p.a,{type:"text",name:"gender",onChange:function(e){return d.setFieldValue("gender",e)},value:d.values.value,placeholder:"M"===t.gender?"Male":"F"===t.gender?"Female":"O"===t.gender?"Others":"Not Available",disabled:!1,children:[Object(f.jsx)(i,{value:"M",children:"Male"}),Object(f.jsx)(i,{value:"F",children:"Female"}),Object(f.jsx)(i,{value:"O",children:"Other"}),Object(f.jsx)(i,{value:"N",children:"Prefer Not to Say"})]})}),Object(f.jsxs)(O.a.Item,{label:"Hire Date",name:"hireDate",rules:[{required:!0,message:"Please enter valid Input"}],children:[Object(f.jsx)(g.a,{type:"date",name:"hiredate",onChange:d.handleChange,value:d.values.hiredate?d.values.hiredate.split("T")[0]:d.values.hiredate,disabled:!1}),d.errors.hiredate?Object(f.jsx)("span",{className:"formik_errors",children:d.errors.hiredate}):null]}),Object(f.jsx)(O.a.Item,{label:"Email",children:Object(f.jsx)(g.a,{type:"text",name:"email",onChange:d.handleChange,value:d.values.email,disabled:!0})}),Object(f.jsx)(O.a.Item,{children:Object(f.jsx)(v.a,(a={type:"submit"},Object(b.a)(a,"type","primary"),Object(b.a)(a,"onClick",d.handleSubmit),Object(b.a)(a,"disabled",!d.isValid||d.values.fname===t.fname&&d.values.lname===t.lname&&d.values.gender===t.gender&&(t.dob&&d.values.dob?t.dob.split("T")[0]===d.values.dob.split("T")[0]:d.values.dob===t.dob)&&(t.hiredate&&d.values.hiredate?t.hiredate.split("T")[0]===d.values.hiredate.split("T")[0]:d.values.hiredate===t.hiredate)||""===d.values.fname||""===d.values.lname||""===d.values.gender||""===d.values.dob||""===d.values.hiredate),Object(b.a)(a,"style",!d.isValid||""===d.values.fname&&""===d.values.lname?{cursor:"not-allowed"}:{}),Object(b.a)(a,"children","Submit"),a))})]})})})},S=g.a.Search;var E=function(){var e=Object(n.useState)([]),a=Object(c.a)(e,2),t=a[0],l=a[1],r=Object(n.useState)([]),s=Object(c.a)(r,2),d=s[0],i=s[1],o=Object(n.useState)(),b=!1;function j(){m.a.get("http://localhost:3002/api/get").then((function(e){"ERROR"===e.data?i("404"):l(e.data)}))}Object(n.useEffect)((function(){j()}),[]);for(var p=Object(n.useState)([]),O=Object(c.a)(p,2),g=O[0],x=O[1],y=Object(n.useState)(!1),D=Object(c.a)(y,2),E=D[0],M=D[1],B=function(e){M(!0),document.getElementById("editModal").style.display="block",function(e){m.a.post("http://localhost:3002/api/getFromId",{id:e}).then((function(e){"ERROR"===e.data?i("404"):x(e.data[0])}))}(e)},P=0;P<t.length;P++)o["".concat(t[P].empid)]=!1;var w=Object(n.useState)(""),R=Object(c.a)(w,2),q=R[0],L=R[1],k=Object(n.useState)(!1),F=Object(c.a)(k,2),A=F[0],T=F[1];function H(){A&&(document.getElementById("routeCreatePostButton").innerHTML="New Entry");b=!0,T(!A),j()}A&&(document.getElementById("routeCreatePostButton").innerHTML="Close");var U=Object(n.useState)(!1),_=Object(c.a)(U,2),z=_[0],G=_[1],V=Object(n.useState)(""),W=Object(c.a)(V,2),Y=W[0],J=W[1],Q=Object(n.useState)(""),X=Object(c.a)(Q,2),Z=X[0],$=X[1],K=Object(n.useState)(""),ee=Object(c.a)(K,2),ae=ee[0],te=ee[1],ne=Object(n.useState)(1),le=Object(c.a)(ne,2),re=le[0],se=le[1],de=Object(n.useState)(4),ie=Object(c.a)(de,2),ce=ie[0],oe=(ie[1],re*ce),me=oe-ce,ue=t.slice(me,oe);return Object(f.jsxs)("div",{className:"MainPage",children:[Object(f.jsxs)("div",{className:"mainPageRoute",style:{display:"block",margin:"5px",minHeight:"42px"},children:[Object(f.jsx)(v.a,{type:"primary",onClick:function(){H()},children:Object(f.jsx)("span",{id:"routeCreatePostButton",children:"New Entry"})}),Object(f.jsx)("div",{className:"searchBoxInput",style:{float:"right"},children:Object(f.jsx)(S,{type:"text",placeholder:"Search in page by name & email . . .",onChange:function(e){!function(e){L(e.target.value)}(e)},style:{width:"25vw",float:"left",fontSize:"18px"}})}),Object(f.jsxs)("div",{className:"modal",style:A?{display:"block",zIndex:999}:{display:"none"},children:[Object(f.jsx)("span",{className:"close",onClick:H,children:"\xd7"}),Object(f.jsx)("div",{className:"myModalDisplay",children:Object(f.jsx)(C,{closeSpan:b})})]})]}),Object(f.jsxs)("div",{id:"myModal",className:"modal",children:[Object(f.jsx)("span",{className:"close",onClick:function(){document.getElementById("myModal").style.display="none",J(""),G(!1),j();var e=document.getElementById("myModelArticleCenterInput"),a=document.getElementById("myModelArticleCenterUpload");e.value="",e.style.display="none",a.style.display="none"},children:"\xd7"}),Object(f.jsxs)("div",{className:"myModalDisplay",children:[Object(f.jsx)("div",{className:"myModalSection",children:Object(f.jsxs)("div",{className:"myModelSectionCenter",children:[Object(f.jsx)("img",{className:"modal-img",alt:"",id:"img01"}),Object(f.jsx)("div",{id:"caption"})]})}),Object(f.jsx)("div",{className:"myModalArticle",children:Object(f.jsxs)("div",{className:"myModelArticleCenter",children:[Object(f.jsx)(v.a,{type:"primary",onClick:function(){return function(e){var a=document.getElementById("img01"),t=document.getElementById("myModelArticleCenterInput"),n=document.getElementById("myModelArticleCenterUpload");t.style.display="block",n.style.display="block",console.log(a.alt),te(a.alt)}()},children:"Update"}),Object(f.jsx)("input",{id:"myModelArticleCenterInput",type:"file",onChange:function(e){return function(e){var a=new FormData;a.append("myImage",e.target.files[0]),m.a.post("http://localhost:3002/api/image",a).then((function(e){if("ERROR"===e.data)console.log(e),i("404");else{var a=e.data.path.split("\\"),t="/"+a[1]+"/"+a[2],n=document.getElementById("img01");n.src=""+t,console.log(n.alt),$(t),G(!0)}}))}(e)},style:{width:"200px",color:"white"},icon:Object(f.jsx)(u.a,{})}),Object(f.jsx)(v.a,{type:"primary",id:"myModelArticleCenterUpload",onClick:function(){z&&m.a.post("http://localhost:3002/api/updateImage",{empid:ae,picturepath:Z}).then((function(e){if(console.log(e),"ERROR"===e.data)i("404");else{var a=document.getElementById("myModelArticleCenterInput"),t=document.getElementById("myModelArticleCenterUpload");a.style.display="none",t.style.display="none",$(),J("Image Updated")}}))},children:"Upload"}),z?Object(f.jsx)("div",{style:{color:"green",padding:"5px",width:"115px",fontWeight:"600",fontSize:"800"},children:Y}):null]})})]})]}),Object(f.jsx)("div",{className:"modal",id:"editModal",style:{zIndex:999},children:E?Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{className:"close",onClick:function(){document.getElementById("editModal").style.display="none",M(!1),x(""),j()},children:"\xd7"}),Object(f.jsx)("div",{className:"myModalDisplay",children:Object(f.jsx)(I,{record:g,loading:E})})]}):Object(f.jsx)("h2",{children:"Loading..."})}),Object(f.jsx)("div",{className:"EmpContainer",children:ue.filter((function(e,a){return""!==q&&q?ue[a].fname.toLowerCase().includes(q.toLowerCase())||ue[a].lname.toLowerCase().includes(q.toLowerCase())||ue[a].email.toLowerCase().includes(q.toLowerCase())?e:"":e})).map((function(e,a){return Object(f.jsxs)("div",{className:"Emp",children:[Object(f.jsxs)("div",{className:"EmpDisplay",children:[Object(f.jsxs)("div",{className:"EmpContent",children:[Object(f.jsx)("img",{alt:e.fname,id:"m".concat(e.empid),src:e.picturepath&&0!==e.picturepath.length?e.picturepath:"https://www.w3schools.com/howto/img_avatar.png",style:{cursor:"pointer"},onClick:function(e){return function(e){var a=document.getElementById("myModal"),t=document.getElementById("img01"),n=document.getElementById("caption");a.style.display="block",t.src=e.target.src,t.alt=e.target.id.slice(1),n.innerHTML=e.target.alt}(e)}}),Object(f.jsxs)("div",{className:"EmpContentDetails",children:[Object(f.jsxs)("span",{children:[e.fname," ",e.lname]}),Object(f.jsx)("span",{children:e.email})]})]}),Object(f.jsxs)("div",{className:"EmpMenu",tabIndex:"-1",children:[Object(f.jsx)(v.a,{type:"primary",onClick:function(){!function(e){var a=document.getElementById(e);"none"===a.style.getPropertyValue("display")?a.style.setProperty("display","block"):a.style.setProperty("display","none")}(e.empid)},style:{width:"100px"},children:"View"}),Object(f.jsx)(v.a,{type:"primary",onClick:function(){B(e.empid)},children:"Edit"}),Object(f.jsx)(v.a,{onClick:function(){var a;window.confirm("Are you sure you want to delete this record?")&&(a=e.empid,m.a.post("http://localhost:3002/api/delete",{empid:a}).then((function(e){"ERROR"===e.data?i("404"):j()})))},type:"primary",danger:!0,children:"Delete"})]})]}),Object(f.jsx)("div",{className:"EmpHide",id:e.empid,style:{display:"none"},children:Object(f.jsx)("div",{className:"dropdown",children:Object(f.jsx)("div",{className:"dropdown_section",children:Object(f.jsxs)("div",{className:"EmpIndividualContent",children:[Object(f.jsxs)("p",{children:["Employee Id : ",e.empid]}),Object(f.jsxs)("p",{children:["Date Of Birth: ",e.dob.slice(8,10),"/",e.dob.slice(5,7),"/",e.dob.slice(0,4)]}),Object(f.jsxs)("p",{children:["Gender:"," ","M"===e.gender?"Male":"F"===e.gender?"Female":"O"===e.gender?"Others":"Not Available"]}),Object(f.jsxs)("p",{children:["Hire Date: ",e.hiredate.slice(8,10),"/",e.hiredate.slice(5,7),"/",e.hiredate.slice(0,4)]})]})})})})]},a)}))}),Object(f.jsx)(N,{postsPerPage:ce,totalPosts:t.length,paginate:function(e){return se(e)}}),Object(f.jsx)("div",{className:"EmpContainerError",style:"404"!==d?{display:"none"}:{display:"block"},children:"404"===d?Object(f.jsx)("div",{className:"Error",children:Object(f.jsx)("img",{className:"ErrorImage",alt:"404 Page Not Found",src:h})}):null})]})},M=function(){return Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"navbar",children:Object(f.jsx)("a",{className:"header",href:"/",children:"Employee Management System"})}),Object(f.jsx)(d.a,{children:Object(f.jsx)(i.a,{path:"/",exact:!0,render:function(e){return Object(f.jsx)(E,{})}})})]})},B=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,245)).then((function(a){var t=a.getCLS,n=a.getFID,l=a.getFCP,r=a.getLCP,s=a.getTTFB;t(e),n(e),l(e),r(e),s(e)}))};s.a.render(Object(f.jsx)(l.a.StrictMode,{children:Object(f.jsx)(M,{})}),document.getElementById("root")),B()}},[[237,1,2]]]);
//# sourceMappingURL=main.e7fba665.chunk.js.map