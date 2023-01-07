import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {movieType,checkdate} from '../computations/regularexp';
import { useTheme } from '@mui/material/styles';

const Edit = ({open,close,selectedCheckboxes,setRefresh}) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const small=useMediaQuery(theme.breakpoints.down('sm'));
  const[edited,setEdited]=useState({movie_type:"",release_date:"",theatre_name:"",show_timings:"",
  ticket_price:"",movie_validity_start:"",movie_validity_ends:"",movie_description:""});
  
  const [response,setResponse]=useState(null);
  const [finalDialogBox,setFinalDialogBox]=useState(false);
  const [conditionChecker,setConditionChecker]=useState(null);

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
    for (const [key, value] of Object.entries(edited)) {
      
      if(value===""){
        checking=false;
        let error=key.toUpperCase();
        error=error.replace(/_/g," ");
        setConditionChecker(error +" required some values");
        break;
      }

      switch(`${key}`){
        case 'movie_type':
          checking=movieType(value);
          break;  
        
        case 'release_date':
          checking=checkdate(`${value}`);
          break;

        case 'theatre_name':
          checking=value.length<=20&&value.length>=3;
          break;

        case 'show_timings':
          checking=(value==='AM'||value==='am'||value==='Am'
                  ||value==='PM'||value==='pm'||value==='Pm'
                  ||value==='AM/PM'||value==='am/pm'||value==='Am/Pm')
          break;
        
        case 'movie_description':
          checking=value.split(/\b\S+\b/g).length>=10 && value.split(/\b\S+\b/g).length<=15;
          break;
        case 'movie_validity_start':
          checking=checkdate(`${value}`);
          break;

        case 'movie_validity_ends': 
          checking=checkdate(`${value}`)   
          break;

        default:
          break;

      }

      if(checking===false){
        
        let error=key.toUpperCase();
        error=error.replace(/_/g," ");
        
        setConditionChecker(error+" value:- " + value +" is not satisfying required conditions");
        
        break;
      }
    }
    
    if(checking===false){
      return false;
    }

    return true;
  }

  async function edit(){
  
    if(mychecker()===false)return;
  
    await fetch("http://localhost:8080/MovieTicket/edit", {
      method: 'post',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'release_date':edited.release_date,
      'movie_type':edited.movie_type,
      'movie_description':edited.movie_description,
      'theatre_name':edited.theatre_name,
      'show_timings':edited.show_timings,
      'movie_validity_start':edited.movie_validity_start,
      'movie_validity_ends':edited.movie_validity_ends,
      'ticket_price':edited.ticket_price,
      },
      body:JSON.stringify(Object.assign({},selectedCheckboxes)),
    }).then(res => res.json()).then(res => setResponse(res))
    .then(setFinalDialogBox(true));

  }


  const changed=(event)=>{
    const n= event.target.name;
    const v= event.target.value;
    setEdited({...edited,[n]:v});
  }
  return (
    <Box>
      {
       finalDialogBox===true && response==="Success" &&
       <Dialog fullScreen={small} open={open} onClose={()=>closeDialog()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Edit</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Data Edited Successfully!!!</DialogContent>
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
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Edit</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Unable to Edit your data!!!</DialogContent>
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
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Edit</DialogTitle>
        <DialogContent>
            <FormControl sx={{width:'auto',minWidth:'calc(23.5%)',m:1}} variant="filled" >
              <InputLabel htmlFor="filled-customer-number">Movie Type</InputLabel>
              <FilledInput id="filled-customer-number" name="movie_type" value={edited.movie_type} onChange={changed}/>
            </FormControl>
            <TextField id="date" label="Release Date" name='release_date' type="date" sx={{minWidth:'calc(23.5%)',m:1}} InputLabelProps={{shrink: true}} value={edited.release_date} onChange={changed}/>
            <FormControl sx={{width:'auto',minWidth:'calc(23.5%)',m:1}} variant="filled" >
              <InputLabel htmlFor="filled-documentid">Theatre Name</InputLabel>
              <FilledInput id="filled-documentid" name="theatre_name" value={edited.theatre_name} onChange={changed}/>
            </FormControl>
            <FormControl sx={{width:'auto',minWidth:'calc(23.5%)',m:1}} variant="filled" >
              <InputLabel htmlFor="filled-business-year">Show Timings</InputLabel>
              <FilledInput id="filled-business-year" name="show_timings" value={edited.show_timings} onChange={changed}/>
            </FormControl>
            <FormControl sx={{width:'auto',minWidth:'calc(23.5%)',m:1}} variant="filled" >
              <InputLabel htmlFor="filled-business-year">Ticket Price</InputLabel>
              <FilledInput id="filled-business-year" name="ticket_price" value={edited.ticket_price} onChange={changed}/>
            </FormControl>
            <TextField id="date" label="Start Date" name="movie_validity_start" type="date" sx={{width:'auto',minWidth:'calc(23.5%)',m:1}} InputLabelProps={{shrink: true}} value={edited.movie_validity_start} onChange={changed}/>
            <TextField id="date" label="End Date" name="movie_validity_ends" type="date" sx={{width:'auto',minWidth:'calc(23.5%)',m:1}} InputLabelProps={{shrink: true}} value={edited.movie_validity_ends} onChange={changed}/>
            <FormControl sx={{width:'auto',minWidth:'98%',ml:1}} variant="filled" >
              <InputLabel htmlFor="filled-business-year">Movie Description</InputLabel>
              <FilledInput id="filled-business-year" name="movie_description" sx={{height:'100px',background:'white','&:focus':{background:"white"},'&:active':{background:"white"},'&:hover':{background:"white"}}} value={edited.movie_description} onChange={changed}/>
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
            <Button autoFocus onClick={()=>edit()} type="submit" sx={{border:'1px solid white',color:'white',pl:10,pr:11,ml:-1}}>Edit</Button>
            <Button onClick={close} autoFocus sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
      }
      
    </Box>

  );
}

export default Edit;