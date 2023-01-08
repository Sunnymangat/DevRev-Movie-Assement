import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import RefreshIcon from '@mui/icons-material/Refresh';
import CrudModal from "./CrudModal";
import AdvanceModal from "./AdvanceModal";

export function useWindowDimensions() {

  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return { width };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    //eslint-disable-next-line
  }, [hasWindow]);

  return windowDimensions;

}


const ButtonArea = ({
  selectedCheckboxes,
  setSearchingId,
  setSearchIdCount,
  setRefresh,
  searchingId,
  userData
}) => {

  const { width } = useWindowDimensions();
  const [icon, setIcon] = useState(false);  
  const [modal, setModal] = useState("");
  const [movieId, setMovieId] = useState("");


  async function searchID() {

    await fetch("http://localhost:8080/MovieTicket/search", {
      method: "get",
      headers: {
        movieId: movieId,
      },
    }).then((res) => res.json())
    .then((res) => {setSearchIdCount(res)})
    .then(setSearchingId(movieId))
    .then(setIcon(true), setRefresh(true));

  }

  const func = (e) => {
    
    if (movieId!=="" && (e.key === "Enter" || e.key === "NumpadEnter")) {
      searchID();
    }

  };

  const func1 = () => {
  
    if (movieId!=="") {
      searchID();
    }

  };

  const searchCustomerId = (e) => {
    setMovieId(e.target.value);
  };

  const ClearInput = () => {
    setMovieId("");
    setIcon(false);
    setSearchingId("");
  };


  return (
    <div className="buttonArea">
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ mt: 1 }}>
        {
          searchingId!=="bookingdetails"?
          <Button
          sx={{
            color: "white",
            px: 9,
            border:1,
            borderColor:"#15AEF2",
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
            "&:disabled":{color:"white",borderColor:"#15AEF2"},
          }}
          disabled={userData.user_id!==""?false:true}
          onClick={() => setSearchingId("bookingdetails")}
        >     
          <Box>Booking Details</Box>
        </Button>
          :
          <Button
          sx={{
            color: "white",
            px: 10,
            border:1,
            borderColor:"#15AEF2",
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white' },
            borderRightColor:(userData.user_id===""||(userData!=="" && userData.user_type!=='admin'))?"#15AEF2 !important":"transparent",
          }}
          onClick={()=>{setSearchingId("")}}
          >
            <Box>CLOSE</Box>
          </Button> 
        }
        
        {
        searchingId!=='AdvanceSearch'?
          <Button
            sx={{
              color: "white",
              px: 10,
              border:1,
            borderColor:"#15AEF2",
            borderRightColor:(userData.user_id===""||(userData!=="" && userData.user_type!=='admin'))?"#15AEF2 !important":"transparent",
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white' },
            }}
            onClick={() => setModal("advancesearch")}
          >
            <Box>ADVANCE SEARCH</Box>
          </Button>
          
          :
          
          <Button
            sx={{
              color: "white",
              px: 10,
              border:1,
              borderColor:"#15AEF2",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#2bbfff",borderColor:'white' },
              borderRightColor:(userData.user_id===""||(userData!=="" && userData.user_type!=='admin'))?"#15AEF2 !important":"transparent",
            }}
            onClick={()=>{setSearchingId("")}}
            >
              <Box>CLOSE</Box>
            </Button>
          }
        <Button
          sx={{
            color: "white",
            px: 10,
            border:1,
            borderColor:"#15AEF2",
            whiteSpace: "nowrap",
            visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white' },
          }}
          onClick={() => {setModal("analyticsview")}}
        >
          <Box>ADD THEATRE</Box>
        </Button>

        
          {
            width >= 540 ?
            <ButtonGroup>
            
            <Button 
            sx={{
              ml:0.1,border:1,borderColor:"#15AEF2",
              "&:hover": { bgcolor: "#2bbfff",
              borderColor:'white',color:'white' }
            }} 
            onClick={()=>setRefresh(true)}>
              <RefreshIcon/>
            </Button>
            </ButtonGroup>
            :
            null
          }    
      </ButtonGroup>

      {
      width < 540 ?
        <Box display="flex" alignItems="center" justifyContent="center">
        
        <ButtonGroup>
        <Button 
        sx={{
          mt:1,ml:1,border:1,borderColor:"#15AEF2",
          "&:hover": { bgcolor: "#2bbfff",borderColor:'white',
          color:'white'}
        }} 
        onClick={()=>setRefresh(true)}><RefreshIcon/></Button>
        </ButtonGroup>

        </Box>
        :
        null
      }

      <Box>
        <FormControl sx={{ width: "24ch", mt: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-customerId">
            Search Movie
          </InputLabel>

          <FilledInput
            id="filled-adornment-customerId"
            name="customerId"
            value={movieId ? movieId : ""}
            onChange={searchCustomerId}
            onKeyDown={(e) => func(e)}
            endAdornment={
              <InputAdornment position="end">
               <SearchIcon onClick={()=>{func1()}} sx={{cursor:'pointer'}}/>
              </InputAdornment>
              }
              sx={{bgColor:'white'}}
          />
    
        </FormControl>

        {
        icon ? (
          <CloseIcon
            onClick={ClearInput}
            sx={{ py: 2, "&:hover": { cursor: "pointer" } }}
            />
          ) 
          : 
          null
        }
      </Box>
      {
      width >= 1220 ? (
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ mt: 1, ml: -10 }}
        >
          <Button
            sx={{ 
              color: "white", 
              px: 9,  
              border:1,
              borderColor:"#15AEF2",
              visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
              "&:hover": { bgcolor: "#2bbfff",borderColor:'white'} }}
            onClick={() => setModal("add")}
          >
            <Box>ADD</Box>
          </Button>

          
          <Button
            sx={{ color: "white", px: 9,
            border:1,visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
            borderColor:"#15AEF2",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
            "&:disabled":{color:"white",borderLeftColor:'#15AEF2'} }}
            onClick={() => setModal("edit")}
            disabled={selectedCheckboxes.length!==0?false:true}
          >
            <Box>EDIT</Box>
          </Button>
          
          <Button
            sx={{ color: "white", px: 9, border:1,
            borderColor:"#15AEF2",visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
            "&:disabled":{color:"white",borderColor:"#15AEF2"} }}
            onClick={() => setModal("delete")}
            disabled={selectedCheckboxes.length!==0?false:true}
          >
            <Box>DELETE</Box>
          </Button>

        </ButtonGroup>
        )
        : 
        (
        <Box display="flex" alignItems="center" justifyContent="center">
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ mt: 1, mb: 1, ml: 1 }}
        >
          <Button
            sx={{ color: "white",
              px: 7,
              border:1,
              borderColor:"#15AEF2",
              visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
              "&:hover": { bgcolor: "#2bbfff",borderColor:'white'} }}
            onClick={() => setModal("add")}
          >
            <Box>ADD</Box>
          </Button>
         
          <Button
            sx={{ color: "white", px: 7,
            border:1,visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
            borderColor:"#15AEF2",
            "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
            "&:disabled":{color:"white",borderLeftColor:'#15AEF2'}}}
            onClick={() => setModal("edit")}
            disabled={selectedCheckboxes.length!==0?false:true}
          >
            <Box>EDIT</Box>
          </Button>
         
          <Button
            sx={{ color: "white", px: 7,
            visibility:(userData!==null && userData.user_type==="admin")?"visible":"hidden",
             border:1,
             borderColor:"#15AEF2",
             "&:hover": { bgcolor: "#2bbfff",borderColor:'white'},
             "&:disabled":{color:"white",borderColor:"#15AEF2"}}}
             onClick={() => setModal("delete")}
             disabled={selectedCheckboxes.length!==0?false:true}
          >
            <Box>DELETE</Box>
          </Button>
        </ButtonGroup>
        </Box>

      )
      }

      {
        modal === "" ?
        null 
        
        : 

        (
        <CrudModal
          open={modal}
          selectedCheckboxes={selectedCheckboxes}
          close={() => setModal("")}
          setRefresh={setRefresh}
        />
        )

      }
      {
        modal === "" ? 
        null 
        
        : 

        (
        <AdvanceModal 
          setModal={(v)=>setModal(v)} 
          open={modal} close={() => setModal("")} 
          setSearchingId={setSearchingId} 
          setSearchIdCount={setSearchIdCount} 
          setRefresh={(v)=>setRefresh(v)}/>
        )
      }
    </div>
  );
};

export default ButtonArea;
