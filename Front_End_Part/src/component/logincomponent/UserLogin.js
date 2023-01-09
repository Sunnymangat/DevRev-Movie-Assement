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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserLogin = ({open,close,setUserData}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const small=useMediaQuery(theme.breakpoints.down('sm'));
  const [response,setResponse]=useState(null);
  const [finalDialogBox,setFinalDialogBox]=useState(false);
  const [conditionChecker,setConditionChecker]=useState(null);
  const [userType,setUserType]=useState("");
  const [field,setnewfields]=useState({
    user_id:"",user_password:"",user_mobile:"",user_type:""
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
      if((key==='user_mobile' && userType==='normal')||key==='user_type')continue;
      if(value===""){
        checking=false;
        let error=key.toUpperCase();
        error=error.replace(/_/g," ");
        setConditionChecker(error +" required some values");
        break;
      }
      switch(`${key}`){  
        case 'user_id':
          const value1=value.trim();
            function validateEmail(email) {
              var re = /\S+@\S+\.\S+/;
              return re.test(email);
            }
            checking=value1!=="" && validateEmail(value1);
            break;
        case 'user_password':
            checking=value.trim().length>=6;
            break;
        case 'user_mobile':
          checking=value.trim().length===10;
          break;    
        default:
            break;
      }

      if(checking===false){
        let error=key.toUpperCase();
        error=error.replace(/_/g," ");
        setConditionChecker(error+" is not satisfying required conditions");
        break;
      }
    }

    if(checking===false){
      return false;
    }
    return true;
  }

  async function login(){
    
    if(mychecker()===false)return;
    const field1={user_id:field.user_id.trim(),user_password:field.user_password.trim(),
                user_mobile:field.user_mobile.trim(),user_type:field.user_type.trim()}

    await fetch("http://localhost:8080/MovieTicket/loginuser", {
      method: 'post',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(Object.assign(field1)),
    }).then(res => res.json()).then(res => {if(res==="Success"){setUserData({user_id:field.user_id,user_type:userType})}setResponse(res)})
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
            <AccountCircleIcon sx={{fontSize:'60px'}}/><br/>Log In</DialogTitle>
            {
                userType==="" && 
                <div style={{paddingBottom:'2%',textAlign:'center'}}>
                <Button sx={{color:'white',mx:1,border:1,
                                borderColor:"#15AEF2",
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                px: 4,}} onClick={()=>{setUserType("normal")}}><Box>Normal</Box></Button>       
                <Button sx={{color:'white',mx:1,border:1,
                                borderColor:"#15AEF2",
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                px: 4,}} onClick={()=>{setUserType("admin")}}><Box>Admin</Box></Button>
                </div>
                
            }
            {
                userType==="admin" &&
                <DialogContent>
                    <div style={{textAlign:'center',color:'white'}}>{userType.toUpperCase()}</div>
                    <FormControl sx={{width:'95%',m:1}} variant="filled">
                    <InputLabel htmlFor="filled-business-code">User ID</InputLabel>
                    <FilledInput id="filled-business-code"  name="user_id" value={field.movie_name} onChange={changeValues}/>
                    </FormControl>
                    <FormControl sx={{width:'95%',m:1}} variant="filled" >
                    <InputLabel htmlFor="filled-customer-number">Password</InputLabel>
                    <FilledInput id="filled-customer-number" name="user_password" value={field.movie_type} onChange={changeValues}/>
                    </FormControl>
                    <FormControl sx={{width:'95%',m:1}} variant="filled" >
                    <InputLabel htmlFor="filled-customer-number">Mobile</InputLabel>
                    <FilledInput id="filled-customer-number" name="user_mobile" value={field.movie_type} onChange={changeValues}/>
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
            }
            {
                userType==="normal" && 
                <DialogContent>
                    <div style={{textAlign:'center',color:'white'}}>NORMAL USER</div>
                    <FormControl sx={{width:'95%',m:1}} variant="filled">
                    <InputLabel htmlFor="filled-business-code">User ID</InputLabel>
                    <FilledInput id="filled-business-code"  name="user_id" value={field.movie_name} onChange={changeValues}/>
                    </FormControl>
                    <FormControl sx={{width:'95%',m:1}} variant="filled" >
                    <InputLabel htmlFor="filled-customer-number">Password</InputLabel>
                    <FilledInput id="filled-customer-number" name="user_password" value={field.movie_type} onChange={changeValues}/>
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
            }
            {
                userType!=="" &&
                <DialogActions sx={{ml:1,mr:1}}>
                <Button sx={{color:'white',width:'35ch',mx:1,border:1,
                                borderColor:"#15AEF2",
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                px: 4,}} onClick={()=>login()}><Box>Login</Box></Button>       
                <Button sx={{color:'white',width:'35ch',mx:1,border:1,
                                borderColor:"#15AEF2",
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                                "&:disabled":{color:"white",borderColor:"#15AEF2"},
                                px: 4,}} onClick={()=>close()}><Box>Cancel</Box></Button>
              </DialogActions>
            }

      </Dialog>
      }     
    </Box>
  );
}

export default UserLogin;
