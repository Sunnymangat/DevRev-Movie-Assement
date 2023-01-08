import React,{useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LogOut = ({open,close,setUserData}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const small=useMediaQuery(theme.breakpoints.down('sm'));
    const [response,setResponse]=useState(null);
    const [finalDialogBox,setFinalDialogBox]=useState(false);
  
    React.useEffect(()=>{
      if(finalDialogBox===true && response==="Success"){
        const timer = setTimeout(() => {
          setFinalDialogBox(false);
          close();
        },2000);
        return () => clearTimeout(timer);
      }
      // eslint-disable-next-line
    },[finalDialogBox,response]);
  
    const closeDialog=()=>{
      setFinalDialogBox(false);
      close();
    }
  
    const goBack=()=>{
      setFinalDialogBox(false);
      setResponse(null);
    }
    
    const closeDialogFalse=()=>{
      setFinalDialogBox(false);
      close();
    }
  
    return (
      <Box>
        {
          finalDialogBox===true && response==="Success" &&
         <Dialog fullScreen={small} open={open} onClose={()=>closeDialog()} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title" sx={{color:'white',textAlign:'center'}}>
          <AccountCircleIcon sx={{fontSize:'100px'}}/><br/>Login In</DialogTitle>
          <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Login Successfully!!!</DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <DialogActions>
              <Button onClick={()=>closeDialog()} autoFocus sx={{border:'1px solid white',color:'white',pl:20,pr:20}}>Close</Button>
            </DialogActions>
          </Box>
         </Dialog>
        }
        {
          finalDialogBox===true && response==="Fail" &&
          <Dialog fullScreen={small} open={open} onClose={()=>closeDialogFalse()} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title" sx={{color:'white',textAlign:'center'}}>
              <AccountCircleIcon  sx={{fontSize:'100px'}}/><br/>Login In</DialogTitle>
          <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Unable to login bad credential!!</DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <DialogActions>
              <Button autoFocus onClick={()=>goBack()} type="submit" sx={{border:'1px solid white',color:'white',pl:10,pr:11,ml:-1}}>Back</Button>
              <Button onClick={()=>closeDialogFalse()} autoFocus sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Close</Button>
            </DialogActions>
          </Box>
          </Dialog>
         }
         {
          finalDialogBox===false && 
          <Dialog fullScreen={fullScreen} open={open} onClose={close} aria-labelledby="responsive-dialog-title" sx={{p:10}}>
          <DialogTitle id="responsive-dialog-title" sx={{color:'white',textAlign:'center'}}>
              <AccountCircleIcon sx={{fontSize:'100px'}}/><br/>Log Out</DialogTitle>
                  <div style={{paddingBottom:'2%',textAlign:'center'}}>
                  <Button sx={{color:'white',mx:1,border:1,
                                  borderColor:"#15AEF2",
                                  whiteSpace: "nowrap",
                                  "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                  "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                  px: 4,}} onClick={()=>{setUserData({user_id:"",user_type:""});close();}}><Box>Log Out</Box></Button>       
                  <Button sx={{color:'white',mx:1,border:1,
                                  borderColor:"#15AEF2",
                                  whiteSpace: "nowrap",
                                  "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                  "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                  px: 4,}} onClick={()=>close()}><Box>Cancel</Box></Button>
                  </div>
        </Dialog>
        }     
      </Box>
    );
}

export default LogOut;