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
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [advanceSearch, setAdvanceSearch] = useState({
    movie_name:"",
    search_date:"",
    theatre_name:"",
  });

  async function advanceSearched() {
    
    await fetch("http://localhost:8080/MovieTicket/advance_search", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "movie_name":advanceSearch.movie_name,
        "search_date":advanceSearch.search_date,
        "theatre_name":advanceSearch.theatre_name,
      },    
    }).then((res)=>res.json()).then((res)=>setSearchIdCount(res))
    .then(setSearchingId("AdvanceSearch"), setRefresh(true)).then(close());

  }

  const changed = (e) => {
    setAdvanceSearch({ ...advanceSearch, [e.target.name]: e.target.value });
  };

  return (
    <div>
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
    </div>
  );
};

export default AdvanceSearch;
