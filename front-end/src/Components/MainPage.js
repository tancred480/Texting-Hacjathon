import Papa from "papaparse";
import axios from "axios";
import { useState } from "react/cjs/react.development";
export default function MainPage() {
  const [groupName,setGroupName] = useState("");
  const [groupPwd,setGroupPwd] = useState("");
  const [leaderName,setLeaderName] = useState("");
  const [leaderphone,setLeaderPhone] = useState("");
  const [csvFile,setCsvFile] = useState({});
  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        complete: function(results) {
//          console.log("Finished:", results.data);
          setCsvFile(results.data);
        }}
      )
    }
  }
  const handleSubmit=()=>{
    const data = {
      g_name:groupName,
      g_pwd:groupPwd,
      l_name:leaderName,
      l_phone:leaderphone,
      csvFile:csvFile,
    }
    axios.post("/api/uploadfile",data);
  }
  return (
    <div className="App">
      <div className="container mt-3 shadow p-4">
  <h2>Register Group</h2>
  <div className="form-horizontal">
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="group name">Group Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" onChange={(e)=>setGroupName(e.target.value)} id="group_name" placeholder="Enter group name" name="group_name"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="leader name">Group Leader Name</label>
      <div className="col-sm-10">
        <input type="text" className="form-control"onChange={(e)=>setLeaderName(e.target.value)} id="leader_name" placeholder="Enter group leader name" name="leader_name"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-3" htmlFor="leader phone">Group Leader phone number</label>
      <div className="col-sm-10">
        <input type="text" className="form-control"onChange={(e)=>setLeaderPhone(e.target.value)} id="leader_phone" placeholder="Enter group leader phone no." name="leader_phone"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="group pwd">Group Password</label>
      <div className="col-sm-10">
        <input type="password" className="form-control" onChange={(e)=>setGroupPwd(e.target.value)} id="group_pwd" placeholder="Enter group password" name="group_pwd"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="pwd">Choose CSV file:</label>
      <div className="col-sm-10">          
        <input type="file" onChange={handleFileChange} accept=".csv,.xlsx,.xls" className="form-control" id="pwd" placeholder="Enter password" name="pwd"/>
      </div>
    </div>
    <div className="form-group">        
      <div className="col-sm-offset-2 col-sm-10">
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}