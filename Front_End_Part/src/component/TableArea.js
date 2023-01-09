import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from '@mui/material/TextField';
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TablePagination from "@mui/material/TablePagination";
import MyTableHead from './MyTableHead';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { blue } from "@mui/material/colors";
import { formatDate } from "../computations/formatdate";
import { getComparator,stableSort } from '../computations/sorting';
import { useTheme } from "@mui/material/styles";
import {checkdate} from '../computations/regularexp';
import IllusionTable from "./IllusionTable";

const BookShow=({movieValidityStart,movieValidityEnds,userData,movieName,theatreName,open,close,setRefresh})=>{
  const theme = useTheme();
  const small=useMediaQuery(theme.breakpoints.down('sm'));
  const [response,setResponse]=React.useState(null);
  const [finalDialogBox,setFinalDialogBox]=React.useState(false);
  const [userRequirements,setuserRequirements]=React.useState({
    user_id:userData.user_id,
    user_type:userData.user_type,
    movie_name:movieName,
    theatre_name:theatreName,
    show_timings:"",
    show_date:"",
    seat_booked:""
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
    
    for (let [key, value] of Object.entries(userRequirements)) {
      value=value.trim();
      if(key==='show_timings'){
        checking=(value==='AM'||value==='am'||value==='Am'
                  ||value==='PM'||value==='pm'||value==='Pm'
                  ||value==='AM/PM'||value==='am/pm'||value==='Am/Pm');
      }else if(key==='show_date'){
        checking=checkdate(value);
        if(formatDate(new Date())>value){
          setConditionChecker("Not allowed to use past dates");
          checking=false;
          break;
        }
        if(formatDate(movieValidityStart)>value){
          setConditionChecker("Select any date after on or after movie released");
          checking=false
          break;
        }
        if(value>formatDate(movieValidityEnds)){
          setConditionChecker("Show not available for selected day");
          checking=false
          break;
        }
        
      }else if(key==='seat_booked'){
        const v1=value.trim();
        if(v1>=1 && v1<=5)checking=true;
        else{checking=false; setConditionChecker(key.replace(/_/g," ").toUpperCase() +" required values from 1 to 5");break;}
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
  

  const addShow=async()=>{
    
    if(mychecker()===false)return;
    const userRequirements1={
      user_id:userData.user_id.trim(),
      user_type:userData.user_type.trim(),
      movie_name:movieName.trim(),
      theatre_name:theatreName.trim(),
      show_timings:userRequirements.show_timings.trim(),
      show_date:userRequirements.show_date.trim(),
      seat_booked:userRequirements.seat_booked.trim()
    };
    await fetch("http://localhost:8080/MovieTicket/bookticket",{
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(userRequirements1),
    }).then((res)=>res.json()).then(res => setResponse(res))
    .then(setFinalDialogBox(true));
  }

  const changed=(e)=>{
    const n= e.target.name;
    const v= e.target.value;
    setuserRequirements({...userRequirements,[n]:v});
  }
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  
  return(
    <Box>
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
        finalDialogBox===true && response==="Fail2" &&
        <Dialog fullScreen={small} open={open} onClose={()=>closeDialogFalse()} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Book Show</DialogTitle>
        <DialogContent sx={{color:'white',textAlign:'center',fontSize:'18px'}}>Already Booked {userRequirements.movie_name+' '+userRequirements.show_timings} show for {userRequirements.show_date} !!!</DialogContent>
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
          <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Book Show</DialogTitle>
          <DialogContent>
          <FormControl variant="filled" sx={{m:2,width:'90%'}}>  
          <InputLabel htmlFor="filled-Invoice-Currency">
          Show Timings
          </InputLabel>
          <FilledInput id="filled-Invoice-Currency" name="show_timings"  onChange={(e)=>changed(e)}/>
          </FormControl>
          <TextField id="date" label="Book Date" name="show_date" type="date" 
          sx={{width:'90%',m:2}} InputLabelProps={{shrink: true}} 
          value={userRequirements.movie_validity_start} onChange={changed}/>

          <FormControl variant="filled" sx={{m:2,width:'90%'}}>
          <InputLabel htmlFor="filled-Invoice-Currency">
          Seat Booked
          </InputLabel>
          <FilledInput id="filled-Invoice-Currency" name="seat_booked"  onChange={(e)=>changed(e)}/>
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
              <Button onClick={()=>addShow()} autoFocus type="submit" sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Submit</Button>
              <Button onClick={()=>close()} autoFocus sx={{border:'1px solid white',color:'white',pl:9,pr:9}}>Cancel</Button>
            </DialogActions>
          </Box>
        </Dialog>
      }
    </Box>
  );
}

const MyTableBody=({userData,setSelectedData,setRefresh })=> {
  
  
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [modal, setModal] = React.useState({
    open:false,
    movie_name:"",
    theatre_name:"",
    movieValidityStart:"",
    movieValidityEnds:"",
  });

  const [selected, setSelected] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);

  const [rowsCount, setRowsCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('movieName');


  useEffect(() => {
    
    const totalRows = async () => {
      await fetch("http://localhost:8080/MovieTicket/", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setRowsCount(res));
    };

    const firstTime = async () => {
      await fetch("http://localhost:8080/MovieTicket/", {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          rowsPerPage: rowsPerPage,
          page: -1,
        },
      })
        .then((res) => res.json())
        .then((res) => setRows([...res]));
    };

    totalRows();
    firstTime();

    //eslint-disable-next-line
  }, [rowsPerPage]);


  const pageChangeToNext = async () => {
    
    await fetch("http://localhost:8080/MovieTicket/", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        rowsPerPage: rowsPerPage,
        page: page,
      },
    }).then((res) => res.json()).then((res) => setRows([...rows, ...res]));

  };

  const handleSelectAllClick = (event) => {
    
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.movieName);
      setSelected(newSelecteds);
      setSelectedData(newSelecteds);
      return;
    }

    setSelected([]);
    setSelectedData([]);

  };

  const handleClick = (event, movieName) => {
    
    const selectedIndex = selected.indexOf(movieName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, movieName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectedData(newSelected);

  };

  const handleChangePage = (event, newPage) => {
    
    if (newPage > page) {
      
      const val = pageData.find((element) => element === newPage);
      
      if (val === undefined) {
        setPageData((pageData) => [...pageData, newPage]);
        pageChangeToNext();
      }
    }

    setPage(newPage);

  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    setPageData([]);
    setRows([]);
  };
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (movieName) => selected.indexOf(movieName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <MyTableHead
            userData={userData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
            {
               stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.movieName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.movieName)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.movieName}
                      selected={isItemSelected}
                      sx={{ backgroundColor: "#2C4250",height:'80px !important'}}
                    >

                      <TableCell padding="checkbox">
                        <Checkbox
                          sx={{
                            color: "white",
                            visibility:(userData!==null&&userData.user_type==="admin")?"visible":"hidden",
                            "&.Mui-checked": {
                              color: blue[400],
                            },
                          }}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ color: "white" }}>{row.movieName}</TableCell>
                      <TableCell sx={{ color: "white" }}>{formatDate(row.releaseDate)}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.movieType}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.movieDescription}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.theatreName}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.showTimings}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <Button 
                        onClick={()=>setModal({open:true,movie_name:row.movieName,theatre_name:row.theatreName,
                                              movieValidityStart:row.movieValidityStart,movieValidityEnds:row.movieValidityEnds})}
                        sx={{
                          color: "white",
                          px: 4,
                          border:1,
                          borderColor:"#15AEF2",
                          whiteSpace: "nowrap",
                          "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
                          "&:disabled":{color:"white",borderColor:"#15AEF2"},
                        }}
                        disabled={(userData.user_id==="")?true:false}
                        >Book
                        </Button>
                        </TableCell>
                    </TableRow>
                  );
                })}
              {
              emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={19} />
                </TableRow>
              )
              }
            </TableBody>
          </Table>
        </TableContainer>
       
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ background: "#283E4C", color: "white" }}
        />

      </Paper>
    </Box>
          {
            modal.open === false ? 
            null 
            : 
            (
            <BookShow userData={userData} setModal={(v)=>setModal(v)} open={modal.open} movieName={modal.movie_name} theatreName={modal.theatre_name} 
              movieValidityStart={modal.movieValidityStart} movieValidityEnds={modal.movieValidityEnds} close={() => setModal({open:false,movie_name:"",theatre_name:"",movieValidityStart:"",movieValidityEnds:""})} setRefresh={setRefresh}/>
            )
          }
    </>
  );
}


const TableArea = ({userData, setSelectedData, refresh, setRefresh }) => {
  
  useEffect(() => {
  
    if (refresh === true){
      const timer = setTimeout(() => {
        setRefresh(false);
        setSelectedData([]);
      }, 100);

      return () => clearTimeout(timer);

    }

    //eslint-disable-next-line
  }, [refresh]);
  
  return (
    <>
      {
        refresh === false ? 
          <MyTableBody userData={userData} setSelectedData={setSelectedData} setRefresh={setRefresh}/>
          : 
          <IllusionTable/>
      }
    </>
  );
};

export default TableArea;
