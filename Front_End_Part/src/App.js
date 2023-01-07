import React from "react";
import { useState } from "react";
import TableArea from "./component/TableArea";
import TopSection from "./component/TopSection";
import ButtonArea from "./component/ButtonArea";
import BottomSection from "./component/BottomSection";
import TableAreaSearch from "./component/TableAreaSearch";
import TableAreaAdvanceSearch from "./component/TableAreaAdvanceSearch";
import "./App.css";
import UserBookedTicketsTable from "./component/UserBookedTicketsTable";


function App() {
  const [userData,setUserData]=useState({user_id:"",user_type:""});
  const [selectedData, setSelectedData] = useState([]);
  const [searchingId, setSearchingId] = useState("");

  const [searchIdCount, setSearchIdCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  React.useEffect(()=>{
  },[userData]);
  
  return (
    <div className="App">
      <TopSection userData={userData} setUserData={(val)=>setUserData(val)}/>
      <div>
        <ButtonArea
          userData={userData}
          setUserData={setUserData}
          selectedCheckboxes={selectedData}
          setSearchingId={(val) => setSearchingId(val)}
          setSearchIdCount={(val) => setSearchIdCount(val)}
          setRefresh={(val) => setRefresh(val)}
          searchingId={searchingId}
        />
      </div>

      <div className="tablearea">
      {
        searchingId === "" && searchingId!=='AdvanceSearch' && searchingId !== "bookingdetails" &&
           <TableArea
            userData={userData}
            setSelectedData={(val) => setSelectedData(val)}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}
          />
      }
      {
          searchingId !== "" && searchingId!=='AdvanceSearch' && searchingId !== "bookingdetails" &&
          <TableAreaSearch
          userData={userData}
            setSelectedData={(val) => setSelectedData(val)}
            searchingId={searchingId}
            searchIdCount={searchIdCount}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}/>
      }
      {
         searchingId !== "" && searchingId === "AdvanceSearch" &&   searchingId !== "bookingdetails" &&
            <TableAreaAdvanceSearch
            userData={userData}
            setSelectedData={(val) => setSelectedData(val)}
            searchingId={searchingId}
            searchIdCount={searchIdCount}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}/>
      }  
      {
        searchingId !== "" && searchingId === "bookingdetails" &&
            <UserBookedTicketsTable
            userData={userData}
            setSelectedData={(val) => setSelectedData(val)}
            searchingId={searchingId}
            searchIdCount={searchIdCount}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}/>
      }    
      </div>

      <div className="bottomsection">
        <BottomSection />
      </div>
      
    </div>
  );
}

export default App;
