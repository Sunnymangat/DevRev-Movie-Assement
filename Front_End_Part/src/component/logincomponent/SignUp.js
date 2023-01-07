import React,{useState} from "react";
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
import { useTheme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const SignUp = ({open,close}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const small=useMediaQuery(theme.breakpoints.down('sm'));
  const [response,setResponse]=useState(null);
  const [finalDialogBox,setFinalDialogBox]=useState(false);
  const [conditionChecker,setConditionChecker]=useState(null);
  const [field,setnewfields]=useState({
    user_name:"",mobile_number:"",user_id:"",user_password:""
  });

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

    
  const mychecker=()=>{
    let checking=true;
    for (const [key, value] of Object.entries(field)) {
      
      if(value===""){
        checking=false;
        let error=key.toUpperCase();
        error=error.replace(/_/g," ");
        setConditionChecker(error +" required some values");
        break;
      }

      switch(`${key}`){
        case 'user_name':
          checking=value.length>=3 && value.length<=20;
          break;
        case 'mobile_number':
            checking=value.length===10;
            break;  
        case 'user_id':
            var mailformat = /^([A-Za-z0-9_])+@([A-Za-z0-9_])+([A-Za-z]{2,4})$/;
            checking=value.match(mailformat);
            break;
        case 'user_password':
            checking=value.length>=6;
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
  async function signUp(){
    
    if(mychecker()===false)return;   
    
    await fetch("http://localhost:8080/MovieTicket/newuser", {
      method: 'post',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(Object.assign(field)),
    }).then(res => res.json()).then(res => setResponse(res))
    .then(setFinalDialogBox(true));
  }

  
  const changeValues=(event)=>{
    const n= event.target.name;
    const v= event.target.value;
    setnewfields({...field,[n]:v});
  };

  return (
    <Box>
      {
       finalDialogBox===true && response==="Success" &&
       <Dialog fullScreen={small} open={open} onClose={()=>closeDialog()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white',textAlign:'center'}}>
        <PersonAddIcon sx={{fontSize:'50px'}}/><br/>Sign Up</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Signed Up Successfully!!!</DialogContent>
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
            <PersonAddIcon  sx={{fontSize:'50px'}}/><br/>Sign Up</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Unable to Sign Up!!<br/>Use Different ID or Try Again</DialogContent>
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
            <PersonAddIcon sx={{fontSize:'50px'}}/><br/>Sign Up</DialogTitle>
            <DialogContent>
            {
                conditionChecker!==null && 
                <Box display="flex" textAlign="center" justifyContent="center">
                    <FormControl sx={{color:'white',fontSize:'18px'}}>
                    {conditionChecker}
                    </FormControl>
                </Box>
            }
            <FormControl sx={{width:'95%',m:1,}} variant="filled">
                <InputLabel htmlFor="filled-business-code">User Name</InputLabel>
                <FilledInput id="filled-business-code" name="user_name" value={field.user_name} onChange={changeValues}/>
            </FormControl>    
            <FormControl sx={{width:'95%',m:1}} variant="filled">
                <InputLabel htmlFor="filled-business-code">Mobile Number</InputLabel>
                <FilledInput id="filled-business-code"  name="mobile_number" value={field.mobile_number} onChange={changeValues}/>
            </FormControl>
            <FormControl sx={{width:'95%',m:1}} variant="filled">
                <InputLabel htmlFor="filled-business-code">Email Id</InputLabel>
                <FilledInput id="filled-business-code"  name="user_id" value={field.user_id} onChange={changeValues}/>
            </FormControl>
            <FormControl sx={{width:'95%',m:1}} variant="filled">
                <InputLabel htmlFor="filled-business-code">Password</InputLabel>
                <FilledInput id="filled-business-code"  name="user_password" value={field.user_password} onChange={changeValues}/>
            </FormControl>

                </DialogContent>
                <DialogActions sx={{ml:1,mr:1}} >
                <Button sx={{color:'white',width:'35ch',mx:1,border:1,
                                borderColor:"#15AEF2",
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                px: 4,}} onClick={()=>signUp()}><Box>Sign Up</Box></Button>       
                <Button sx={{color:'white',width:'35ch',mx:1,border:1,
                                borderColor:"#15AEF2",
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                px: 4,}} onClick={()=>close()}><Box>Cancel</Box></Button>
              </DialogActions>
      </Dialog>
      }
      
    </Box>
  );
}

export default SignUp;