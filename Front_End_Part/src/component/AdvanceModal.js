import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import AdvanceSearch from "./AdvanceSearch";

const AnalyticsViewDialogBox=({open,close,setRefresh})=>{
  const theme = useTheme();
  const small=useMediaQuery(theme.breakpoints.down('sm'));
  const [response,setResponse]=React.useState(null);
  const [finalDialogBox,setFinalDialogBox]=React.useState(false);
  const [newTheatre,setNewTheatre]=React.useState({
    theatre_name:'',
    theatre_location:'',
  });
 
  const [conditionChecker,setConditionChecker]=React.useState(null);
  React.useEffect(()=>{
    if(finalDialogBox===true && response==="Success"){
      const timer = setTimeout(() => {
        setFinalDialogBox(false);
        close();
        setRefresh(true);
      },2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  },[finalDialogBox,response]);

  const closeDialog=()=>{
    setFinalDialogBox(false);
    close();
    setRefresh(true);
  }

  const goBack=()=>{
    setFinalDialogBox(false);
    setResponse(null);
  }
  
  const closeDialogFalse=()=>{
    setFinalDialogBox(false);
    close();
  }

  const mychecker=()=>{
    
    let checking=true;
    
    for (let [key, value] of Object.entries(newTheatre)) {
      value=value.trim();
      if(key==='theatre_name'){
        checking=value.length<=20 && value.length>=3;
      }else if(key==='theatre_location'){
        checking=value.length>=5&&value.length<=20;
      }
      if(checking===false ){
        let error=key;
        error=error.replace(/_/g," ");
        setConditionChecker(error.toUpperCase() +" required some values");
        break;
      }
    }
    if(checking===false){
      return false;
    }
    return true;
  }
  

  const addTheatre=async()=>{
    
    if(mychecker()===false)return;  
    const newTheatre1={
      theatre_name:newTheatre.theatre_name.trim(),
      theatre_location:newTheatre.theatre_location.trim(),
    };
    await fetch("http://localhost:8080/MovieTicket/theatre",{
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(newTheatre1),
    }).then((res)=>res.json()).then(res => setResponse(res))
    .then(setFinalDialogBox(true));;

  }

  const changed=(e)=>{
    const n= e.target.name;
    const v= e.target.value;
    setNewTheatre({...newTheatre,[n]:v});
  }
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  
  return(
    <Box>
      {
       finalDialogBox===true && response==="Success" &&
       <Dialog fullScreen={small} open={open} onClose={()=>closeDialog()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Add</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Data Added Successfully!!!</DialogContent>
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
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Add</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Unable to add your data!!!</DialogContent>
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
        <Dialog fullScreen={fullScreen} open={open} onClose={close} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Add Theatre</DialogTitle>
          <DialogContent>

          <FormControl variant="filled" sx={{ml:2,width:'45%'}}>
          <Box sx={{color:'white',mb:1}}>Theatre Name</Box>  
          <InputLabel htmlFor="filled-Invoice-Currency" sx={{mt:3.5}}>
          Theatre Name
          </InputLabel>
          <FilledInput id="filled-Invoice-Currency" name="theatre_name"  onChange={(e)=>changed(e)}/>
          </FormControl>
          <FormControl variant="filled" sx={{ml:2,width:'45%'}}>
          <Box sx={{color:'white',mb:1}}>Theatre Location</Box>  
          <InputLabel htmlFor="filled-Invoice-Currency" sx={{mt:3.5}}>
          Theatre Location
          </InputLabel>
          <FilledInput id="filled-Invoice-Currency" name="theatre_location"  onChange={(e)=>changed(e)}/>
          </FormControl>  
          {
            conditionChecker!==null && 
              <Box display="flex" textAlign="center" justifyContent="center">
                <FormControl sx={{color:'white',fontSize:'18px'}}>
                  {conditionChecker}
                </FormControl>
              </Box>
          }

          </DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <DialogActions>
              <Button onClick={()=>addTheatre()} autoFocus type="submit" sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Submit</Button>
              <Button onClick={()=>close()} autoFocus sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Cancel</Button>
            </DialogActions>
          </Box>
        </Dialog>
      }
    </Box>
  );
}

const AdvanceModal = ({ open, close,setSearchingId,setSearchIdCount,setRefresh,setModal}) => {
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));

  if (open === "") return null;

  if (open === "bookingdetails") {

    return( 
    <Dialog fullScreen={fullScreen} open={open} onClose={close} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{ color: "white" }}>
          Booking Details
        </DialogTitle>
        
        <DialogContent sx={{color:'white'}}>
          Trying to implement booking part
        </DialogContent>

        <Box display="flex" alignItems="center" justifyContent="center">
        <DialogActions>
          <Button sx={{ color: "white", width: "auto", border: 1, minWidth: 205 }} onClick={() => close()}>
            Close
          </Button>
        </DialogActions>
        </Box>
    </Dialog>
    );

  } 
  else if (open === "analyticsview") {  
    return (
      <AnalyticsViewDialogBox open={true} close={close} setRefresh={(v)=>setRefresh(v)}/>
    );
  } 
  else if (open === "advancesearch") {
      return <AdvanceSearch open={true} close={close} setSearchingId={setSearchingId} setSearchIdCount={setSearchIdCount} setRefresh={(v)=>setRefresh(v)}/>;
  }
  else {
      return null;
  }

};

export default AdvanceModal;
