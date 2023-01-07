import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Delete = ({open,close,selectedCheckboxes,setRefresh}) => {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [response,setResponse]=useState(null);
  const [finalDialogBox,setFinalDialogBox]=useState(false);
  

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

  async function Delete(){
    
    await fetch("http://localhost:8080/MovieTicket/del",{
      method: 'post',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(Object.assign({},selectedCheckboxes)),
    }).then(res => res.json()).then(res => setResponse(res))
    .then(setFinalDialogBox(true));

  }
  

  return (
    
    <Box>
      {
       finalDialogBox===true && response==="Success" &&
       <Dialog fullScreen={fullScreen} open={open} onClose={()=>closeDialog()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Delete</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Data Deleted Successfully!!!</DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <DialogActions>
            <Button onClick={()=>closeDialog()} autoFocus sx={{border:'1px solid white',color:'white',pl:20,pr:20}}>Close</Button>
          </DialogActions>
        </Box>
       </Dialog>
      }

      {
        finalDialogBox===true && response==="Fail" &&
        <Dialog fullScreen={fullScreen} open={open} onClose={()=>closeDialogFalse()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Delete</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Unable to delete your data!!!</DialogContent>
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
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>
          Delete Record?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color:'white'}}>
            Are you sure you want to delete these record[s]?
          </DialogContentText>
        </DialogContent>
        
        <Box display="flex" alignItems="center" justifyContent="center">
        <DialogActions>
          <Button autoFocus onClick={()=>close()} sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Cancel</Button>
          <Button onClick={()=>Delete()} autoFocus  sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Delete</Button>
        </DialogActions>
        </Box>
      </Dialog>
      }
    </Box>
  );
}

export default Delete;