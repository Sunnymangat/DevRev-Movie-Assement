import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AdvanceSearch = ({ open, close,setSearchingId,setSearchIdCount,setRefresh}) => {
  const theme = useTheme();
  const small=useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [response,setResponse]=React.useState(null);
  const [finalDialogBox,setFinalDialogBox]=React.useState(false);
  const [conditionChecker,setConditionChecker]=React.useState(null);
  const [advanceSearch, setAdvanceSearch] = useState({
    movie_name:"",
    search_date:"",
    theatre_name:"",
  });
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

  const mychecker=()=>{
    let check1=false,check2=false,check3=false;
    for (const [key, value] of Object.entries(advanceSearch)) {
      if(key==='movie_name'){
        check1=value.trim().length>=1;
      }else if(key==='search_date'){
        check2=value.trim().length>=1;
      }else if(key==='theatre_name'){
        check3=value.trim().length>=1;
      }
    }
    if((!check1)&&(!check2)&&(!check3)){
      setConditionChecker("Fill atleast one field");
      return false;
    }
    return true;
  }


  async function advanceSearched() {
    if(mychecker()===false)return;

    await fetch("http://localhost:8080/MovieTicket/advance_search", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "movie_name":advanceSearch.movie_name.trim(),
        "search_date":advanceSearch.search_date.trim(),
        "theatre_name":advanceSearch.theatre_name.trim(),
      },    
    }).then((res)=>res.json()).then((res)=>setSearchIdCount(res))
    .then(setSearchingId("AdvanceSearch"), setRefresh(true)).then(close());

  }

  const changed = (e) => {
    setAdvanceSearch({ ...advanceSearch, [e.target.name]: e.target.value });
  };

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

  return (
    <div>
      {
       finalDialogBox===true && response==="Success" &&
       <Dialog fullScreen={small} open={open} onClose={()=>closeDialog()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Book Show</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Ticket Booked Successfully!!!</DialogContent>
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
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Book Show</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Booking Failed!!!</DialogContent>
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ color: "white" }}>
          Advance Search
        </DialogTitle>
        
        <DialogContent>

          <FormControl sx={{ width: "90%", m:2}} variant="filled">
            <InputLabel htmlFor="filled-invoice-id">Movie Name</InputLabel>
            <FilledInput id="filled-invoice-id" name="movie_name" onChange={changed}/>
          </FormControl>

          <TextField id="date" label="Date" name='search_date' type="date" sx={{width:'90%',m:2}} InputLabelProps={{shrink: true}} value={advanceSearch.search_date} onChange={changed}/>

          <FormControl sx={{ width: "90%", m:2 }} variant="filled">
            <InputLabel htmlFor="filled-business-code">Theatre Name</InputLabel>
            <FilledInput id="filled-business-code" name="theatre_name" onChange={changed}/>
          </FormControl>
          
        </DialogContent>
        {
            conditionChecker!==null && 
              <Box display="flex" textAlign="center" justifyContent="center">
                <FormControl sx={{color:'white',fontSize:'18px'}}>
                  {conditionChecker}
                </FormControl>
              </Box>
          }
        <Box display="flex" alignItems="center" justifyContent="center">
          <DialogActions>
            <Button
              sx={{
                color: "white",
                width: "auto",
                border: 1,
                minWidth: 205,
                ml: -1.2,
              }}
              onClick={()=>advanceSearched()}
            >
              SEARCH
            </Button>
            <Button
              sx={{ color: "white", width: "auto", border: 1, minWidth: 205 }}
              onClick={() => close()}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      }
    </div>
  );
};

export default AdvanceSearch;
