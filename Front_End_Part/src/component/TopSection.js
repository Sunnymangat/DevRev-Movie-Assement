import React from "react";
import MovieIcon from '@mui/icons-material/Movie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SignUp from "./logincomponent/SignUp";
import UserLogin from "./logincomponent/UserLogin";
import LogOut from "./logincomponent/LogOut";

const TopSection = ({userData,setUserData}) => {
  const[user,setUser]=React.useState({open:false,modal:""});
  return (
    <>
    {
      user.modal==="signup" &&
      <SignUp open={user.open} close={()=>setUser({open:false,modal:""})}/>
    }
    {
      user.modal==="login" &&
      <UserLogin setUserData={setUserData} open={user.open} close={()=>setUser({open:false,modal:""})}/>
    }
    {
      user.modal==="logout" &&
      <LogOut setUserData={setUserData} open={user.open} close={()=>setUser({open:false,modal:""})}/>
    }
    <div className="topSection">
      <span className="topSectionOne" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        <button onClick={()=>setUser({open:true,modal:"signup"})}><PersonAddIcon/><br/>SignUp</button>
      </span>
      <span className="topSectionSecond">
        Movie Ticket Booking
        <MovieIcon sx={{fontSize:30}}/>
      </span>
      <span className="topSectionThird">
        {
          userData.user_id==="" &&
          <button onClick={()=>setUser({open:true,modal:"login"})}><AccountCircleIcon/><br/>Login</button>
        }
        {
          userData.user_id!=="login" &&
          <button onClick={()=>setUser({open:true,modal:"logout"})}>{userData.user_id}</button>
        }
      </span>
    </div>
    </>
  );
};

export default TopSection;
